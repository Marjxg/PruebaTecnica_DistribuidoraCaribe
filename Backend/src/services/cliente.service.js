const clienteRepository = require('../repositories/cliente.repository');


const crear = async (cliente) => {

    if (!cliente.nombre || cliente.nombre.trim() === '') {

        const error = new Error(
            'El nombre del cliente es obligatorio'
        );

        error.status = 400;

        throw error;
    }

    return await clienteRepository.crear({
        nombre: cliente.nombre.trim(),
        nit: cliente.nit?.trim() || null,
        telefono: cliente.telefono?.trim() || null,
        email: cliente.email?.trim() || null
    });
};


const obtenerTodos = async () => {

    return await clienteRepository.obtenerTodos();
};


const obtenerPorId = async (id_cliente) => {

    const cliente =
        await clienteRepository.obtenerPorId(id_cliente);


    if (!cliente) {

        const error =
            new Error('Cliente no encontrado');

        error.status = 404;

        throw error;
    }


    return cliente;
};


const actualizar = async (id_cliente, cliente) => {

    if (!cliente.nombre || cliente.nombre.trim() === '') {

        const error =
            new Error('El nombre del cliente es obligatorio');

        error.status = 400;

        throw error;
    }


    const clienteExistente =
        await clienteRepository.obtenerPorId(id_cliente);


    if (!clienteExistente) {

        const error =
            new Error('Cliente no encontrado');

        error.status = 404;

        throw error;
    }


    return await clienteRepository.actualizar(
        id_cliente,
        {
            nombre: cliente.nombre.trim(),
            nit: cliente.nit?.trim() || null,
            telefono: cliente.telefono?.trim() || null,
            email: cliente.email?.trim() || null,

            // Si no viene activo, conservamos el valor actual
            activo: cliente.activo !== undefined
                ? Boolean(cliente.activo)
                : Boolean(clienteExistente.activo)
        }
    );
};


const eliminar = async (id_cliente) => {

    const cliente =
        await clienteRepository.obtenerPorId(id_cliente);


    if (!cliente) {

        const error =
            new Error('Cliente no encontrado');

        error.status = 404;

        throw error;
    }


    return await clienteRepository.eliminar(id_cliente);
};


module.exports = {
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizar,
    eliminar
};
