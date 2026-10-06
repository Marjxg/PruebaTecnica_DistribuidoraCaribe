const clienteService = require('../services/cliente.service');


const crear = async (req, res, next) => {
    try {

        const cliente = await clienteService.crear(req.body);

        res.status(201).json({
            ok: true,
            message: 'Cliente creado correctamente',
            data: cliente
        });

    } catch (error) {
        next(error);
    }
};


const obtenerTodos = async (req, res, next) => {
    try {

        const clientes = await clienteService.obtenerTodos();

        res.status(200).json({
            ok: true,
            data: clientes
        });

    } catch (error) {
        next(error);
    }
};


const obtenerPorId = async (req, res, next) => {
    try {

        const id_cliente = Number(req.params.id);

        if (isNaN(id_cliente)) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del cliente no es válido'
            });
        }

        const cliente =
            await clienteService.obtenerPorId(id_cliente);

        res.status(200).json({
            ok: true,
            data: cliente
        });

    } catch (error) {
        next(error);
    }
};


const actualizar = async (req, res, next) => {
    try {

        const id_cliente = Number(req.params.id);

        if (isNaN(id_cliente)) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del cliente no es válido'
            });
        }

        const cliente =
            await clienteService.actualizar(
                id_cliente,
                req.body
            );

        res.status(200).json({
            ok: true,
            message: 'Cliente actualizado correctamente',
            data: cliente
        });

    } catch (error) {
        next(error);
    }
};


const eliminar = async (req, res, next) => {
    try {

        const id_cliente = Number(req.params.id);

        if (isNaN(id_cliente)) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del cliente no es válido'
            });
        }

        const cliente =
            await clienteService.eliminar(id_cliente);

        res.status(200).json({
            ok: true,
            message: 'Cliente eliminado correctamente',
            data: cliente
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizar,
    eliminar
};
