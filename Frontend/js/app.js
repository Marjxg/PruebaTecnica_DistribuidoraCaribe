import {
    obtenerToken,
    cerrarSesion
} from './api.js';

import {
    cargarClientes,
    abrirModalNuevo,
    cerrarModal
} from './cliente.js';

const token =
    obtenerToken();

if (!token) {

    window.location.href =
        './login.html';


}

const btnNuevoCliente =
    document.getElementById(
        'btnNuevoCliente'
    );

const btnCerrarModal =
    document.getElementById(
        'btnCerrarModal'
    );

const btnCancelar =
    document.getElementById(
        'btnCancelar'
    );

btnNuevoCliente.addEventListener(
    'click',
    abrirModalNuevo
);

btnCerrarModal.addEventListener(
    'click',
    cerrarModal
);

btnCancelar.addEventListener(
    'click',
    cerrarModal
);

document.addEventListener(
    'DOMContentLoaded',
    cargarClientes
);

const btnCerrarSesion =
    document.getElementById('btnCerrarSesion');


btnCerrarSesion.addEventListener(
    'click',
    () => {

        cerrarSesion();

        window.location.href =
            './login.html';

    }
);
