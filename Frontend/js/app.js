import {
    cargarClientes,
    abrirModalNuevo,
    cerrarModal
} from './cliente.js';


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


/* Nuevo cliente */

btnNuevoCliente.addEventListener(
    'click',
    abrirModalNuevo
);


/* Cerrar modal */

btnCerrarModal.addEventListener(
    'click',
    cerrarModal
);

btnCancelar.addEventListener(
    'click',
    cerrarModal
);


/* Cargar clientes al iniciar */

document.addEventListener(
    'DOMContentLoaded',
    cargarClientes
);
