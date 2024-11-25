import{navbar} from './navbar.js';
import{footer} from './footer.js';

document.querySelector('#contenedornav').innerHTML = navbar;
document.querySelector('#contenedorfooter').innerHTML = footer;

const botonIngresar = document.querySelector('#botonIngresar');
const usuarioDropdown = document.querySelector('#salir');

botonIngresar.addEventListener('click', function(){
    botonIngresar.style.display = "none";
    usuarioDropdown.style.display = "block";
    window.location.href = './login.html';
});
const botonLogOut = document.querySelector('#botonLogOut');

botonLogOut.addEventListener('click', ()=>{
    botonIngresar.style.display = "block";
    usuarioDropdown.style.display = "none";
});

document.getElementById('Registrarse').addEventListener('click', function() { 
    window.location.href = './registro.html';
})


document.getElementById('log').addEventListener('click', function() { 
    console.log('funvionnofnlsk')
    window.location.href = './login.html'
})