import { navbar } from './navbar.js';
import { footer } from './footer.js';

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#contenedornav').innerHTML = navbar;
    document.querySelector('#contenedorfooter').innerHTML = footer;

    const botonIngresar = document.querySelector('#botonIngresar');
    const usuarioDropdown = document.querySelector('#salir');
    let botonLogOut = document.querySelector('#botonLogOut');

    botonIngresar.addEventListener('click', function() {
        botonIngresar.style.display = "none";
        usuarioDropdown.style.display = "block";
        window.location.href = './login.html';
    });

    botonLogOut.addEventListener('click', () => {
        botonIngresar.style.display = "block";
        usuarioDropdown.style.display = "none";
        localStorage.removeItem('usuarioLogueado');
        actualizarNavbar();
    });

    function actualizarNavbar() {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

        if (usuarioLogueado) {
            document.querySelector('#usuarioDropdown .nav-link').innerText = `Hola, ${usuarioLogueado.usu}`;
            botonIngresar.style.display = "none";
            usuarioDropdown.style.display = "block";
        } else {
            botonIngresar.style.display = "block";
            usuarioDropdown.style.display = "none";
        }
    }

    actualizarNavbar();
});
