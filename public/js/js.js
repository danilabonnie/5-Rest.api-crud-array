var botonIngresar = document.querySelector('#botonIngresar');
var usuarioDropdown = document.querySelector('#salir');
var botonLogOut = document.querySelector('#botonLogOut');

botonIngresar.addEventListener('click', ()=>{
    botonIngresar.style.display = "none";
    usuarioDropdown.style.display = "block";
})
const botonIngre = () =>{
    botonIngresar.style.display = "none";
    usuarioDropdown.style.display = "block";
}
const logOut = () =>{
    botonIngresar.style.display = "block";
    usuarioDropdown.style.display = "none";
}


