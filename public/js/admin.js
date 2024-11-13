//boton para mostrar form de editar producto

let botonIngresar = document.querySelector('#editar');
var usuarioDropdown = document.querySelector('#editando');
var botonLogOut = document.querySelector('#cerrar');

botonIngresar.addEventListener('click', ()=>{
    usuarioDropdown.style.display = "block";
});
botonLogOut.addEventListener('click', ()=>{
    botonIngresar.style.display = "block";
    usuarioDropdown.style.display = "none";
});

//boton para mostrar form de agregar producto
var agregarbtn = document.querySelector('#agregar');
console.log(agregarbtn)
var cerrar2 = document.querySelector('#cerrar2');
var agregando = document.querySelector('#agregando');

agregarbtn.addEventListener('click', ()=>{
    agregando.style.display = "none";
});
cerrar2.addEventListener('click', ()=>{
    // agregarbtn.style.display = "block";
    agregando.style.display = "none";
});

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

var agregarprod = document.querySelector('#agregarprod');

const FormularioAgregar = document.forms['formulario']
console.log(FormularioAgregar)
agregarprod.addEventListener('submit', (event)=>{
    event.preventDefault()
    let titulo = FormularioAgregar.titulo.value;
    let descripcion = FormularioAgregar.descripcion.value;
    let precio = FormularioAgregar.precop.value;
    //console.log(nombre,descripcion,precio)
    let nuevosDatos = {titulo:titulo, descripcion:descripcion, precio:precio}
    //objeto js con los datos obtenidos en el form
    let nuevosDatosJson = JSON.stringify(nuevosDatos)
     //console.log(nuevosDatosJson)
});