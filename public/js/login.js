document.addEventListener('DOMContentLoaded', function() {
  mostrarNavbar();
});

const mostrarMensaje = (mensaje) => {
  console.log(mensaje);
  const mensajeBack = document.querySelector('#mensajeBack');
  if (mensajeBack) {
      mensajeBack.className += " bg-warning";
      mensajeBack.innerHTML = mensaje;
  } else {
      console.error('El elemento #mensajeBack no existe en el DOM.');
  }
};

const formularioLogin = document.forms['formlogin'];
formularioLogin.addEventListener('submit', (event) => {
  event.preventDefault();

  const usu = formularioLogin.usu.value;
  const contraseña = formularioLogin.contraseña.value;

  if (!usu || !contraseña) {
      document.querySelector('#mensaje').innerHTML = '*Complete todos los datos';
      return;
  }

  const datosLogin = { usu, contraseña };

  const login = async () => {
      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(datosLogin),
          });

          if (!response.ok) {
              mostrarMensaje('error al verificar usuario');
          }

          const data = await response.json();
          console.log('Datos del usuario:', data);

          loginUsuario(data);
          if (data.id_tip_usu == 2) {
              window.location.href = '/admin.html';
          } else {
              window.location.href = '/index.html';
          }
      } catch (error) {
          console.error('Error de login:', error);
          document.querySelector('#mensaje').innerHTML = 'Error al intentar iniciar sesión';
      }
  };

  login();
});

function loginUsuario(usu) {
  localStorage.setItem('usuarioLogueado', JSON.stringify(usu));
  mostrarNavbar();
}

function logOut() {
  localStorage.removeItem('usuarioLogueado');
  mostrarNavbar();
}

function mostrarNavbar() {
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

  if (usuarioLogueado) {
      document.getElementById('salir').style.display = 'block';
      document.getElementById('botonIngresar').style.display = 'none';
      document.getElementById('usuarioDropdown').querySelector('.nav-link').innerText = `Hola, ${usuarioLogueado.usu}`;
  } else {
      document.getElementById('salir').style.display = 'none';
      document.getElementById('botonIngresar').style.display = 'block';
  }
}
