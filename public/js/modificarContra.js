document.getElementById('formCambioContraseña').addEventListener('submit', async (event) => {
    event.preventDefault();

    const contraseñaActual = document.getElementById('contraseñaActual').value;
    const nuevaContraseña = document.getElementById('nuevaContraseña').value;
    const confirmarContraseña = document.getElementById('confirmarContraseña').value;

    if (nuevaContraseña !== confirmarContraseña) {
        document.querySelector('#mensajeCompletar').innerHTML = '*Las contraseñas no coinciden.'
        document.querySelector('#mensajeCompletar').className += " bg-danger text-light";
        return;
    }

    console.log('Contraseña actual:', contraseñaActual);
    console.log('Nueva contraseña:', nuevaContraseña);

    try {
        const response = await fetch('/modificarContra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contraseñaActual,
                nuevaContraseña
            })
        });

        const result = await response.json();
        console.log("Respuesta del servidor: ", result);
        document.getElementById('mensajeBack').innerHTML = `<div class="alert alert-success">${result.mensaje}</div>`;

        // Redirigir a index.html si la contraseña se cambia correctamente
        if (response.ok) {
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000); // Espera 2 segundos antes de redirigir para que el mensaje de éxito sea visible
        }
    } catch (error) {
        console.log("Error en la solicitud: ", error);
        document.getElementById('mensajeBack').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});

mostrarMensaje = (mensaje) => {
    console.log(mensaje)
    console.log(document.querySelector('#mensajeBack'))
    document.querySelector('#mensajeBack').className += " bg-warning";
    document.querySelector('#mensajeBack').innerHTML = mensaje;
}
