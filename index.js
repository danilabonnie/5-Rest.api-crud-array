const express = require ('express');
const fs = require ('fs');
const cors = require ('cors');
const app = express();
const port =  process.env.MYSQL_ADDON_PORT || 3000;

const db = require ('./db/conexion')
const dotenv = require ('dotenv/config')



app.use(express.json()) 
app.use(express.static('./public'));//ejecutar directamente el front cuando corremos el servidor
app.use(cors());


app.get('/productos', (req, res)=>{
    const sql = "SELECT * FROM productos";
    db.query(sql, (err,result)=>{
        if(err){
            console.error('error de lectura')
            return;
        }
        //console.log(result)
        res.json(result)
    })
})

app.post('/productos', (req, res)=>{
    console.log(req.body)

    console.log(Object.values(req.body))

    const values = Object.values(req.body)

    const sql = "insert into productos (titulo, descripcion, precio, imagen) values (?,?,?,?)"

    db.query(sql, values, (err, result)=>{
        if(err){
            console.error('error al guardar')
            return;
        }
        //console.log(result)
        res.json({mensaje: "nuevo prod agregado"})
    })
})

app.delete('/productos/:id', (req, res)=>{
    const id = req.params.id

    const sql = "delete from productos where id = ?"

    db.query(sql, [id], (err, result)=>{
        if(err){
            console.error('error al borrar')
            return;
        }
        //console.log(result)
        res.json({mensaje: "producto eliminado"})
    })
})

app.put('/productos', (req, res)=>{
    const valores = Object.values(req.body)
    //console.log(valores)
    const sql = "update productos set titulo = ?, descripcion = ?, precio = ?, imagen = ? where id = ?"

    db.query(sql, valores, (err, result)=>{
        if(err){
            console.error('error al modificar producto')
            return;
        }
        //console.log(result)
        res.json({mensaje: "producto actualizado", data: result})
    })
})

// function reIndexar(datos){
//     let indice =1
//     datos.productos.map((p)=>{
//     p.id = indice;
//     indice++;
// })
// }


// app.get('/Productos', (req,res)=>{
//     const datos=leerDatos()
//     res.json(datos.productos)
// })

// app.post('/Productos', (req,res)=>{
//     const datos=leerDatos()
//     const nuevoProducto={id:datos.productos.length+1,
//         ...req.body
//     }
//     datos.productos.push(nuevoProducto)
//     escribirDatos(datos)
//     res.json({mensaje:'Nuevo Producto Agregado'})
// })

// app.put('/Productos/:id', (req,res)=>{
//     const id = req.params.id
//     const nuevosDatos = req.body
//     const datos=leerDatos()
//     const prodEncontrado = datos.productos.find((p)=>p.id==req.params.id)

//         if(!prodEncontrado){
//           return res.status(404),res.json('No se encuentra el producto')
//         }

//         datos.productos = datos.productos.map(p=>p.id==req.params.id?{...p,...nuevosDatos}:p)
//         escribirDatos(datos)
//         res.json({mensaje: 'Productos actualizados', Productos: nuevosDatos})
// })

// app.delete('/Productos/:id', (req,res)=>{
    
//     const id = req.params.id
//     const datos=leerDatos()
//     const prodEncontrado = datos.productos.find((p)=>p.id==req.params.id)

//         if(!prodEncontrado){
//           return res.status(404),res.json('No se encuentra el producto')
//         }

//         datos.productos = datos.productos.filter((p)=>p.id!=req.params.id)
//         reIndexar(datos)
//         escribirDatos(datos)
//         res.json({mensaje:"Producto eliminado", Producto: prodEncontrado})
// })

// app.get('/Productos/:id', (req,res)=>{
//     const datos=leerDatos()
//     const prodEncontrado = datos.productos.find((p)=>p.id==req.params.id)

//         if(!prodEncontrado){
//           return res.status(404),res.json('No se encuentra el producto')
//         }
//         else{
//          return res.json({
//             mensaje: "Producto encontrado",
//             Producto: prodEncontrado
//         })
//         }
// })

app.listen(port, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
}
)