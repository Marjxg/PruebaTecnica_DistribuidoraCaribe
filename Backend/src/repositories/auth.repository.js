const { sql, poolConnect } =
    require('../config/database');


const obtenerClientePorEmail = async (email) => {

    const pool = await poolConnect;

    const result = await pool.request()
        .input(
            'email',
            sql.VarChar(100),
            email
        )
        .execute('sp_cliente_login');

    return result.recordset[0] || null;
};


module.exports = {
    obtenerClientePorEmail
};
