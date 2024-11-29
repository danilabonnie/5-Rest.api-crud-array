document.addEventListener('DOMContentLoaded', function() {
  mostrarNavbar();
});

mostrarMensaje = (mensaje) => {
  console.log(mensaje)
  console.log(document.querySelector('#mensajeBack'))
  document.querySelector('#mensajeBack').className += " bg-warning";
  document.querySelector('#mensajeBack').innerHTML = mensaje;
}


const formularioLogin = document.forms['formlogin'];
formularioLogin.addEventListener('submit', (event) => {
  event.preventDefault();

  const usu = formularioLogin.usu.value;
  const contraseña = formularioLogin.contraseña.value;

  if (!usu || !contraseña) {
      mostrarMensaje('*Complete todos los datos', 'danger');
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
              const errorData = await response.json();
              mostrarMensaje(errorData.mensaje, 'danger');
              return;
          }

          const data = await response.json();
          console.log('Datos del usuario:', data);

          mostrarMensaje(data.mensaje, 'success');
          loginUsuario(data);

          if (data.id_tip_usu == 2) {
              window.location.href = '/admin.html';
          } else {
              window.location.href = '/index.html';
          }
      } catch (error) {
          mostrarMensaje('Error al intentar iniciar sesión', 'danger');
      }

      setTimeout(() => { location.reload(); }, 1000);
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
