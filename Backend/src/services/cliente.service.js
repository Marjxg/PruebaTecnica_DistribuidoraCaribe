const bcrypt = require('bcrypt');

const clienteRepository =
    require('../repositories/cliente.repository');


const crear = async (cliente) => {
    console.log(cliente)

    if (!cliente.nombre || cliente.nombre.trim() === '') {

        const error = new Error(
            'El nombre del cliente es obligatorio'
        );

        error.status = 400;

        throw error;
    }


    if (!cliente.email || cliente.email.trim() === '') {

        const error = new Error(
            'El email del cliente es obligatorio'
        );

        error.status = 400;

        throw error;
    }


    if (!cliente.password || cliente.password.length < 6) {

        const error = new Error(
            'La contraseña debe tener al menos 6 caracteres'
        );

        error.status = 400;

        throw error;
    }


    const email = cliente.email.trim().toLowerCase();


    const clienteExistente =
        await clienteRepository.obtenerPorEmail(email);


    if (clienteExistente) {

        const error = new Error(
            'El email ya está registrado'
        );

        error.status = 409;

        throw error;
    }


    const passwordHash =
        await bcrypt.hash(cliente.password, 12);


    return await clienteRepository.crear({
        nombre: cliente.nombre.trim(),
        nit: cliente.nit?.trim() || null,
        telefono: cliente.telefono?.trim() || null,
        email,
        password_hash: passwordHash
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
            email: cliente.email?.trim().toLowerCase() || null,

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
