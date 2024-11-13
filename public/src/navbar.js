const navbar = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Tienda Online</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="productos.html">Productos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contactos.html">Contactanos</a>
              </li>
            </ul>
            <div id="salir" style="display: none;">
            <ul id="usuarioDropdown" class="navbar-nav mb-lg-0 d-flex">  
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Usuario
                    </a>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Cuenta</a></li>
                    <li><a class="dropdown-item" href="#">Pedidos</a></li>
                    </ul>
                </li>
                    <button id="botonLogOut" class="btn btn-outline-danger" onclick="logOut()" type="submit">Salir</button>
            </ul>
          </div>
              <button id="botonIngresar" class="btn btn-outline-success" onclick="botonIngre()" type="submit">Ingresar</button>
          </div>
        </div>
      </nav>
`;

export{navbar};