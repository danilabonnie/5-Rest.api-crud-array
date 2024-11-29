document.getElementById('formEliminarCuenta').addEventListener('submit', async (event) => {
    event.preventDefault();

    const contraseñaActual = document.getElementById('contraseñaActual').value;

    console.log('Contraseña actual:', contraseñaActual);

    if (confirm('¿Seguro desea eliminar su cuenta?')) {
        try {
            const response = await fetch('/eliminarCuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contraseñaActual
                })
            });

            const result = await response.json();
            console.log("Respuesta del servidor: ", result);
            mostrarMensaje(result.mensaje);

            if (response.ok) {
                localStorage.removeItem('usuarioLogueado');
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000); 
            }
        } catch (error) {
            mostrarMensaje('Error al borrar cuenta');
        }
    }
});

mostrarMensaje = (mensaje) => {
    console.log(mensaje)
    console.log(document.querySelector('#mensajeBack'))
    document.querySelector('#mensajeBack').className += " bg-warning";
    document.querySelector('#mensajeBack').innerHTML = mensaje;
}

