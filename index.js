const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.MYSQL_ADDON_PORT || 3001;
const session = require('express-session');

const db = require('./db/conexion');
const dotenv = require('dotenv/config');

app.use(express.json());
app.use(express.static('./public')); // Ejecutar directamente el front cuando corremos el servidor
app.use(cors());

app.use(session({
    secret: '4', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.get('/productos', (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error de lectura');
            return;
        }
        res.json(result);
    });
});

app.post('/productos', (req, res) => {
    const values = Object.values(req.body);
    const sql = "INSERT INTO productos (titulo, descripcion, precio, imagen) VALUES (?,?,?,?)";
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('error al guardar');
            return;
        }
        res.json({ mensaje: "nuevo prod agregado" });
    });
});

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('error al borrar');
            return;
        }
        res.json({ mensaje: "producto eliminado" });
    });
});

app.put('/productos', (req, res) => {
    const valores = Object.values(req.body);
    const sql = "UPDATE productos SET titulo = ?, descripcion = ?, precio = ?, imagen = ? WHERE id = ?";
    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error('error al modificar producto');
            return;
        }
        res.json({ mensaje: "producto actualizado", data: result });
    });
});

app.post('/usuario', (req, res) => {
    const values = Object.values(req.body);
    const sql = "INSERT INTO usuario (usu, contraseña, id_tip_usu) VALUES (?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al guardar usuario:', err);
            return res.json({ mensaje: "Error al guardar usuario" });
        }
        res.json({ mensaje: "Cuenta registrada" });
    });
});

app.post('/login', (req, res) => {
    const { usu, contraseña } = req.body;

    if (!usu || !contraseña) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    const query = 'SELECT * FROM usuario WHERE usu = ?';
    db.query(query, [usu], (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al realizar la consulta' });
        }

        if (results.length === 0) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        const usuario = results[0];

        if (contraseña === usuario.contraseña) {
            req.session.userId = usuario.id;  
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ mensaje: 'Error al guardar la sesión' });
                }
                return res.status(200).json({
                    mensaje: 'Login exitoso',
                    id: usuario.id,
                    usu: usuario.usu,
                    id_tip_usu: usuario.id_tip_usu
                });
            });
        } else {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }
    });
});



app.post('/modificarContra', (req, res) => {
    const { contraseñaActual, nuevaContraseña } = req.body;

    console.log("Datos recibidos: ", req.body);  

    if (!contraseñaActual || !nuevaContraseña || !req.session.userId) {
        console.log("Faltan datos: ", { contraseñaActual, nuevaContraseña, userId: req.session.userId });
        return res.json({ mensaje: "Faltan datos: contraseña actual, nueva contraseña o ID de usuario en sesión." });
    }

    const usuarioId = req.session.userId;

    const query = 'SELECT contraseña FROM usuario WHERE id = ?';
    db.query(query, [usuarioId], (err, results) => {
        if (err) {
            console.log("Error en la base de datos: ", err);
            return res.json({ mensaje: "Error al consultar la base de datos." });
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado.");
            return res.json({ mensaje: "Usuario no encontrado." });
        }

        if (contraseñaActual !== results[0].contraseña) {
            console.log("Contraseña actual incorrecta.");
            return res.json({ mensaje: "La contraseña actual es incorrecta." });
        }

        const updateQuery = 'UPDATE usuario SET contraseña = ? WHERE id = ?';
        db.query(updateQuery, [nuevaContraseña, usuarioId], (err, result) => {
            if (err) {
                console.log("Error al actualizar la contraseña: ", err);
                return res.json({ mensaje: "Error al actualizar la contraseña." });
            }

            console.log("Contraseña actualizada correctamente.");
            return res.json({ mensaje: "Contraseña cambiada correctamente." });
        });
    });
});


app.post('/eliminarCuenta', (req, res) => {
    const { contraseñaActual } = req.body;

    if (!contraseñaActual || !req.session.userId) {
        return res.status(400).json({ mensaje: 'Faltan datos: contraseña actual o ID de usuario en sesión.' });
    }

    const usuarioId = req.session.userId;

    const query = 'SELECT contraseña FROM usuario WHERE id = ?';
    db.query(query, [usuarioId], (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        if (contraseñaActual !== results[0].contraseña) {
            return res.status(400).json({ mensaje: 'La contraseña actual es incorrecta.' });
        }

        const deleteQuery = 'DELETE FROM usuario WHERE id = ?';
        db.query(deleteQuery, [usuarioId], (err, result) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al eliminar la cuenta.' });
            }

            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ mensaje: 'Error al destruir la sesión.' });
                }
                return res.status(200).json({ mensaje: 'Cuenta eliminada correctamente.' });
            });
        });
    });
});


app.listen(port, () => {
    console.log(`servidor corriendo en el puerto ${port}`);
});
