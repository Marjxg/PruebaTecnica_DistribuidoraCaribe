import {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} from './api.js';


const tablaClientes =
    document.getElementById('tablaClientes');

const modalCliente =
    document.getElementById('modalCliente');

const modalTitulo =
    document.getElementById('modalTitulo');

const formCliente =
    document.getElementById('formCliente');

const mensaje =
    document.getElementById('mensaje');

const idCliente =
    document.getElementById('idCliente');

const nombre =
    document.getElementById('nombre');

const nit =
    document.getElementById('nit');

const telefono =
    document.getElementById('telefono');

const email =
    document.getElementById('email');

const activo =
    document.getElementById('activo');




export const cargarClientes = async () => {

    try {

        tablaClientes.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    Cargando clientes...
                </td>
            </tr>
        `;


        const response =
            await obtenerClientes();


        const clientes =
            response.data;


        if (!clientes.length) {

            tablaClientes.innerHTML = `
                <tr>
                    <td colspan="7" class="empty">
                        No hay clientes registrados.
                    </td>
                </tr>
            `;

            return;
        }


        tablaClientes.innerHTML =
            clientes.map(cliente => `

                <tr>

                    <td>
                        ${cliente.id_cliente}
                    </td>

                    <td>
                        ${cliente.nombre}
                    </td>

                    <td>
                        ${cliente.nit ?? '-'}
                    </td>

                    <td>
                        ${cliente.telefono ?? '-'}
                    </td>

                    <td>
                        ${cliente.email ?? '-'}
                    </td>

                    <td>

                        ${cliente.activo
                    ? '<span class="estado activo">Activo</span>'
                    : '<span class="estado inactivo">Inactivo</span>'
                }

                    </td>

                    <td>

                        <button
                            class="btn btn-edit"
                            data-action="editar"
                            data-id="${cliente.id_cliente}">
                            Editar
                        </button>

                        ${cliente.activo
                    ? `
                                <button
                                    class="btn btn-delete"
                                    data-action="eliminar"
                                    data-id="${cliente.id_cliente}">
                                    Desactivar
                                </button>
                              `
                    : ''
                }

                    </td>

                </tr>

            `).join('');


    } catch (error) {

        mostrarMensaje(
            error.message,
            'error'
        );


        tablaClientes.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    No fue posible cargar los clientes.
                </td>
            </tr>
        `;
    }
};



export const abrirModalNuevo = () => {

    limpiarFormulario();

    modalTitulo.textContent =
        'Nuevo cliente';

    modalCliente.classList.remove('hidden');

    nombre.focus();
};

const abrirModalEditar = async (id) => {

    try {

        const response =
            await obtenerCliente(id);


        const cliente =
            response.data;


        idCliente.value =
            cliente.id_cliente;


        nombre.value =
            cliente.nombre;


        nit.value =
            cliente.nit ?? '';


        telefono.value =
            cliente.telefono ?? '';


        email.value =
            cliente.email ?? '';


        activo.value =
            cliente.activo ? '1' : '0';


        modalTitulo.textContent =
            'Editar cliente';


        modalCliente.classList.remove(
            'hidden'
        );


        nombre.focus();


    } catch (error) {

        mostrarMensaje(
            error.message,
            'error'
        );
    }
};


const guardarCliente = async (event) => {

    event.preventDefault();


    const cliente = {

        nombre:
            nombre.value.trim(),

        nit:
            nit.value.trim(),

        telefono:
            telefono.value.trim(),

        email:
            email.value.trim(),

        activo:
            activo.value === '1'

    };


    try {

        if (!cliente.nombre) {

            mostrarMensaje(
                'El nombre es obligatorio.',
                'error'
            );

            return;
        }


        if (idCliente.value) {

            await actualizarCliente(
                idCliente.value,
                cliente
            );


            mostrarMensaje(
                'Cliente actualizado correctamente.',
                'success'
            );

        } else {

            await crearCliente(cliente);


            mostrarMensaje(
                'Cliente creado correctamente.',
                'success'
            );
        }


        cerrarModal();

        await cargarClientes();


    } catch (error) {

        mostrarMensaje(
            error.message,
            'error'
        );
    }
};


const eliminar = async (id) => {

    const confirmar = confirm(
        '¿Está seguro de eliminar este cliente?'
    );


    if (!confirmar) {
        return;
    }


    try {

        await eliminarCliente(id);


        mostrarMensaje(
            'Cliente eliminado correctamente.',
            'success'
        );


        await cargarClientes();


    } catch (error) {

        mostrarMensaje(
            error.message,
            'error'
        );
    }
};

tablaClientes.addEventListener(
    'click',
    async (event) => {

        const button =
            event.target.closest('button');


        if (!button) {
            return;
        }


        const id =
            button.dataset.id;

        const action =
            button.dataset.action;


        if (action === 'editar') {

            await abrirModalEditar(id);

        }


        if (action === 'eliminar') {

            await eliminar(id);

        }

    }
);

export const cerrarModal = () => {

    modalCliente.classList.add('hidden');

    limpiarFormulario();
};


const limpiarFormulario = () => {

    formCliente.reset();

    idCliente.value = '';
};

const mostrarMensaje = (
    texto,
    tipo
) => {

    mensaje.textContent = texto;

    mensaje.className =
        `mensaje ${tipo}`;


    setTimeout(() => {

        mensaje.classList.add(
            'hidden'
        );

    }, 4000);
};

formCliente.addEventListener(
    'submit',
    guardarCliente
);
