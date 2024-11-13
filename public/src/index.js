import{navbar} from './navbar.js';
document.querySelector('#contenedornav').innerHTML = navbar;
let botonIngresar = document.querySelector('#botonIngresar');
var usuarioDropdown = document.querySelector('#salir');
botonIngresar.addEventListener('click', ()=>{
    botonIngresar.style.display = "none";
    usuarioDropdown.style.display = "block";
});
import{footer} from './footer.js';
document.querySelector('#contenedorfooter').innerHTML = footer;
var botonLogOut = document.querySelector('#botonLogOut');
botonLogOut.addEventListener('click', ()=>{
    botonIngresar.style.display = "block";
    usuarioDropdown.style.display = "none";
});