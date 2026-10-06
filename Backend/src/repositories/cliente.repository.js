const { sql, poolConnect } = require('../config/database');

const crear = async (cliente) => {
    const pool = await poolConnect;

    const result = await pool.request()
        .input('nombre', sql.VarChar(100), cliente.nombre)
        .input('nit', sql.VarChar(20), cliente.nit || null)
        .input('telefono', sql.VarChar(20), cliente.telefono || null)
        .input('email', sql.VarChar(100), cliente.email || null)
        .execute('sp_cliente_crear');

    return result.recordset[0];
};


const obtenerTodos = async () => {
    const pool = await poolConnect;

    const result = await pool.request()
        .execute('sp_cliente_obtener_todos');

    return result.recordset;
};


const obtenerPorId = async (id_cliente) => {
    const pool = await poolConnect;

    const result = await pool.request()
        .input('id_cliente', sql.Int, id_cliente)
        .execute('sp_cliente_obtener_por_id');

    return result.recordset[0] || null;
};


const actualizar = async (id_cliente, cliente) => {
    const pool = await poolConnect;

    const result = await pool.request()
        .input('id_cliente', sql.Int, id_cliente)
        .input('nombre', sql.VarChar(100), cliente.nombre)
        .input('nit', sql.VarChar(20), cliente.nit || null)
        .input('telefono', sql.VarChar(20), cliente.telefono || null)
        .input('email', sql.VarChar(100), cliente.email || null)
        .execute('sp_cliente_actualizar');

    return result.recordset[0];
};


const eliminar = async (id_cliente) => {
    const pool = await poolConnect;

    const result = await pool.request()
        .input('id_cliente', sql.Int, id_cliente)
        .execute('sp_cliente_eliminar');

    return result.recordset[0];
};


module.exports = {
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizar,
    eliminar
};
