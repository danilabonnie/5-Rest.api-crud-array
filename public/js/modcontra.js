const endpoint = '/mod'
document.getElementById('formCambioContraseña').addEventListener('submit', async (event) => {
    event.preventDefault();

    const contraseñaActual = document.getElementById('contraseñaActual').value;
    const nuevaContraseña = document.getElementById('nuevaContraseña').value;
    const confirmarContraseña = document.getElementById('confirmarContraseña').value;

    if (nuevaContraseña !== confirmarContraseña) {
        document.getElementById('mensaje').innerHTML = '<div class="alert alert-danger">Las contraseñas no coinciden.</div>';
        return;
    }

    console.log('Contraseña actual:', contraseñaActual);
    console.log('Nueva contraseña:', nuevaContraseña);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contraseñaActual,
                nuevaContraseña
            })
        });

        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña.');
        }

        const result = await response.json();
        console.log("Respuesta del servidor: ", result);
        document.getElementById('mensaje').innerHTML = `<div class="alert alert-success">${result.mensaje}</div>`;
    } catch (error) {
        console.log("Error en la solicitud: ", error);
        document.getElementById('mensaje').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});