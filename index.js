const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.MYSQL_ADDON_PORT || 3000;
const session = require('express-session');

const db = require('./db/conexion')
const dotenv = require('dotenv/config')



app.use(express.json())
app.use(express.static('./public'));//ejecutar directamente el front cuando corremos el servidor
app.use(cors());

//

app.use(session({
    secret: '4', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));



//


app.get('/productos', (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error de lectura')
            return;
        }
        //console.log(result)
        res.json(result)
    })
})

app.post('/productos', (req, res) => {
    console.log(req.body)

    console.log(Object.values(req.body))

    const values = Object.values(req.body)

    const sql = "insert into productos (titulo, descripcion, precio, imagen) values (?,?,?,?)"

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('error al guardar')
            return;
        }
        //console.log(result)
        res.json({ mensaje: "nuevo prod agregado" })
    })
})

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id

    const sql = "delete from productos where id = ?"

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('error al borrar')
            return;
        }
        //console.log(result)
        res.json({ mensaje: "producto eliminado" })
    })
})

app.put('/productos', (req, res) => {
    const valores = Object.values(req.body)
    //console.log(valores)
    const sql = "update productos set titulo = ?, descripcion = ?, precio = ?, imagen = ? where id = ?"

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error('error al modificar producto')
            return;
        }
        //console.log(result)
        res.json({ mensaje: "producto actualizado", data: result })
    })
})

//usuarios


app.post('/usuario', (req, res) => {
    
    console.log(req.body)

    console.log(Object.values(req.body))

    const values = Object.values(req.body)

    const sql = "INSERT INTO usuario (usu, contraseña, id_tip_usu) VALUES (?, ?, ?)"

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al guardar usuario:', err)
            return res.status(500).json({ mensaje: "Error al guardar usuario" });
        }
        res.json({ mensaje: "Cuenta registrada" })
    })
})

app.post('/login', (req, res) => {
    const { usu, contraseña } = req.body;

    if (!usu || !contraseña) {
        return res.status(400).send('Faltan datos');
    }

    const query = 'SELECT * FROM usuario Where usu = ?';
    db.query(query, [usu], (err, results) => {
        if (err) {
            return res.status(500).send('Error al realizar la consulta');
        }

        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const usu = results[0];

        if (contraseña === usu.contraseña) {
            req.session.id = usu.id;  

            return res.status(200).json({
                mensaje: 'Login exitoso',
                id: usu.id,
                usu: usu.usu,
                id_tip_usu: usu.id_tip_usu
            });
        } else {
            return res.status(400).send('Contraseña incorrecta');
        }
    });
});

app.post('/mod', (req, res) => {
    const { contraseñaActual, nuevaContraseña } = req.body;

    console.log("Datos recibidos: ", req.body);  

    if (!contraseñaActual || !nuevaContraseña || !req.session.id) {
        console.log("Faltan datos: ", { contraseñaActual, nuevaContraseña, id: req.session.id });
        return res.status(400).json({ mensaje: 'Faltan datos: contraseña actual, nueva contraseña o id_usuario en sesión.' });
    }

    const id = req.session.id; 

    const query = 'SELECT contraseña FROM usuario WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.log("Error en la base de datos: ", err);
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado.");
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        if (contraseñaActual !== results[0].contraseña) {
            console.log("Contraseña actual incorrecta.");
            return res.status(400).json({ mensaje: 'La contraseña actual es incorrecta.' });
        }

        const updateQuery = 'UPDATE usuario SET contraseña = ? WHERE id = ?';
        db.query(updateQuery, [nuevaContraseña, id], (err, result) => {
            if (err) {
                console.log("Error al actualizar la contraseña: ", err);
                return res.status(500).json({ mensaje: 'Error al actualizar la contraseña.' });
            }

            console.log("Contraseña actualizada correctamente.");
            return res.status(200).json({ mensaje: 'Contraseña cambiada correctamente.' });
        });
    });
});

app.post('/eliminarCuenta', (req, res) => {
    const { contraseñaActual } = req.body;

    if (!contraseñaActual || !req.session.id) {
        console.log("Faltan datos: ", { contraseñaActual, id: req.session.id });
        return res.status(400).json({ mensaje: 'Faltan datos: contraseña actual o id_usuario en sesión.' });
    }

    const usuarioId = req.session.id;  
    
    const query = 'SELECT contraseña FROM usuario WHERE id = ?';
    db.query(query, [usuarioId], (err, results) => {
        if (err) {
            console.log("Error en la base de datos: ", err);
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado.");
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        if (contraseñaActual !== results[0].contraseña) {
            console.log("Contraseña actual incorrecta.");
            return res.status(400).json({ mensaje: 'La contraseña actual es incorrecta.' });
        }

        const deleteQuery = 'DELETE FROM usuario WHERE id = ?';
        db.query(deleteQuery, [usuarioId], (err, result) => {
            if (err) {
                console.log("Error al eliminar la cuenta: ", err);
                return res.status(500).json({ mensaje: 'Error al eliminar la cuenta.' });
            }

            req.session.destroy((err) => {
                if (err) {
                    console.log("Error al destruir la sesión: ", err);
                    return res.status(500).json({ mensaje: 'Error al destruir la sesión.' });
                }
                console.log("Cuenta eliminada correctamente.");
                return res.status(200).json({ mensaje: 'Cuenta eliminada correctamente.' });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`servidor corriendo en el puerto ${port}`)
}
)