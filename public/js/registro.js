const endpoint = '/usuario'

const formulario = document.forms['formregistro']
console.log(formulario)
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    let usuario = formulario.usuario.value
    let contraseña = formulario.contraseña.value
    let id_tip_usu = 1

    let newDatos = { usu: usuario, contraseña: contraseña, id_tip_usu: id_tip_usu }

    if (!newDatos.usu || !newDatos.contraseña) {
        document.querySelector('#mensajeCompletar').innerHTML = '*Complete todos los datos'
        document.querySelector('#mensajeCompletar').className += " bg-danger text-light";
        return
    } else {
        document.querySelector('#mensajeCompletar').innerHTML = ''
    }

    let nuevosDatosJson = JSON.stringify(newDatos)
    console.log(nuevosDatosJson)
    const enviarNewProducto = async () => {
        try {
            const enviarDatos = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: nuevosDatosJson
            })
            const respuesta = await enviarDatos.json()
            console.log(respuesta.mensaje)

            mostrarMensaje(respuesta.mensaje)
            setTimeout(() => { window.location.href = '/login.html'; }, 3000)
        } catch (error) {
            console.log(error)
        }
    }
    enviarNewProducto()
})


  mostrarMensaje = (mensaje) => {
    console.log(mensaje)
    console.log(document.querySelector('#mensajeBack'))
    document.querySelector('#mensajeBack').className += " bg-warning";
    document.querySelector('#mensajeBack').innerHTML = mensaje
  }