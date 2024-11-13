const btnAgregarProd = document.querySelector('#agregar')
console.log(btnAgregarProd)
btnAgregarProd.addEventListener('click', ()=>{
document.querySelector('#agregando').style.display = 'block'
})

const cerrar = document.querySelector('#cerrar2')
cerrar.addEventListener('click', ()=>{
document.querySelector('#agregando').style.display = 'none'
})


// const botonEditar = document.querySelector('#editar');
// console.log(botonEditar)
// botonEditar.addEventListener('click', ()=>{
//     document.querySelector('#editando').style.display = 'block'
// })

// const cerrar2 = document.querySelector('#cerrar');
// cerrar2.addEventListener('click', ()=>{
//     document.querySelector('#editando').style.display = 'none'
// })

//-----------------------------------------------------------------
const endpoint = '/productos'
// const endpoint = 'http://localhost:3000/productos'

// Event listener para el botón "Añadir Producto"
document.getElementById('agregar').addEventListener('click', function () {
  const formulario = document.getElementById('agregando');
  formulario.classList.toggle('new');
});

// fetch(endpoint)
//   .then(respuesta => respuesta.json())
//   .then(datos => mostrarProductos(datos))


const formulario = document.forms['formulario']
console.log(formulario)
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  var img = document.createElement('img')
  

  let titulo = formulario.titulo.value
  let descripcion = formulario.descripcion.value
  let precio = formulario.precio.value
  // let imagen = img.src = 'th.jpg'
  let imagen = formulario.imagen.value
  console.log(titulo,descripcion,precio,imagen);

  // Objetos con los datos obtenidos en el formulario
  let newDatos = {titulo: titulo, descripcion: descripcion, precio: precio, imagen: imagen }


  if (!newDatos.titulo || !newDatos.descripcion || !newDatos.precio) {
    document.querySelector('#mensajeCompletar').innerHTML = '*Complete todos los datos'
    document.querySelector('#mensajeCompletar').className += " bg-danger text-light";
    return
  }
  else {
    document.querySelector('#mensajeCompletar').innerHTML = ''
    // return
  }

  let nuevosDatosJson = JSON.stringify(newDatos)
  console.log(nuevosDatosJson)
  const enviarNewProducto = async() =>{ //enviar datos al back
    try{
      const enviarDatos = await fetch(endpoint, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: nuevosDatosJson
      })
      //obtengo la respuesta del back
      const respuesta = await enviarDatos.json()
      console.log(respuesta.mensaje)

      //limpiar formulario 
    //document.querySelector('#agregando').reset()
    document.querySelector('#agregando').style.display = 'none'
    mostrarMensaje(respuesta.mensaje)
    //refrescar pagina
    setTimeout(()=>{location.reload();},3000)

    }
    catch(error){
      console.log(error)
    }
  }
  enviarNewProducto()
})

mostrarMensaje=(mensaje)=>{
  console.log(mensaje)
  console.log(document.querySelector('#mensajeBack'))
  document.querySelector('#mensajeBack').className += " bg-warning";
  document.querySelector('#mensajeBack').innerHTML = mensaje
}

//eliminar producto
const eliminar = (id)=>{
  console.log(id)
if(confirm('Seguro desea eliminar?')){
  const eliminarProd = async()=>{
    try{
      const res=await fetch(endpoint+'/'+id,{
        method: 'delete'
      })
      //obtengo respuesta
      const respuesta = await res.json()
      mostrarMensaje(respuesta.mensaje)
      setTimeout(()=>{location.reload();},3000)
    }catch(error){
      mostrarMensaje('error al mostrar mensaje')
    }
    
  }

  eliminarProd()
}
}

//---------------------------------------------------------

//const respuesta = fetch('http://localhost:3000/productos')
//.then(respuesta => respuesta.json())// respuesta = endpoint
//.then(datos => mostrarProductos(datos));

    const contenedor = document.querySelector('#contenedor');
    let productos = ''

//const mostrarProductos = (datos) => {
const obtenerDatos = async()=>{
  try{
    const respuesta = await fetch(endpoint)
    productosRecibidos = await respuesta.json()
    productosRecibidos.forEach(dato => {
        productos += `<div class="card m-2" style="width: 100%; max-width: 250px;">
        <img src="imagenes/${dato.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${dato.titulo}</h5>
          <p class="card-text">$${dato.precio}</p>
          <p class="card-text">${dato.descripcion}</p>
          <div>
            <button class="btn btn-primary" id="editar" type="submit" onclick="editar(${dato.id})"><i class="bi bi-pencil-fill "></i></button>
            <button class="btn btn-danger" id="borrar" type="submit" onclick="eliminar(${dato.id})"><i class="bi bi-trash3-fill "></i></button>
          </div>
          
          
        </div>
        
      </div>
        `;

    })


    contenedor.innerHTML = productos;
  }catch(error){
    mostrarMensaje('error al cargar productos')
  }
 }
obtenerDatos();
//}


const formEditar = document.forms['formulario2']
console.log(formEditar)
const editar = (id) => {
  console.log (id)
  window.scrollTo({ top: 0, behavior: 'smooth' });
  //abro formulario de editar 
  document.querySelector("#editarproducto").style.display = 'block'
  //contenedor de datos a editar
  let prodEditar = {}
  // recoorro los datos del json para ubicar el prod a editar
  productosRecibidos.filter (prod=>{
    if(prod.id==id){
      prodEditar = prod
    }
  }) 
  console.log (prodEditar)

  //Asignar los valores obtenidos al formulario
  formEditar.id.value = prodEditar.id 
  formEditar.titulo.value = prodEditar.titulo
  formEditar.descripcion.value = prodEditar.descripcion
  formEditar.precio.value = prodEditar.precio
  formEditar.imagen.value = prodEditar.imagen
}

  formEditar.addEventListener('submit', (event) => {
    event.preventDefault ();
    //creo objeto con nuevos datos
    const nuevosDatos = {
      titulo: formEditar.titulo.value,
      descripcion: formEditar.descripcion.value,
      precio: formEditar.precio.value,
      imagen: formEditar.imagen.value,
      id: formEditar.id.value
    }

    if (!nuevosDatos.id || !nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.precio) {
      document.querySelector('#mensajeCompletar2').innerHTML = '*Complete todos los datos'
      document.querySelector('#mensajeCompletar2').className += " bg-danger text-light";
      return
    }
    else {
      document.querySelector('#mensajeCompletar2').innerHTML = ''
      // return
    }

    // //validacion de campos vacios igual anterior 
    let nuevosDatosJson = JSON.stringify(nuevosDatos)
    console.log(nuevosDatosJson)
    const enviarNewDatos = async()=>{
      try{
        const enviarDatos = await fetch(endpoint,{
          method: 'put',
          headers: {
            'content-type': 'application/json'
          },
          body: nuevosDatosJson
        })
        const respuesta= await enviarDatos.json()
        console.log(respuesta)
        mostrarMensaje(respuesta.mensaje)
      }catch(error){
        mostrarMensaje('error al verificar datos')
      }
      setTimeout(()=>{location.reload();}, 1000)
    }
    enviarNewDatos();
  }) 