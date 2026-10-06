const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),

    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

const pool = new sql.ConnectionPool(config);

const poolConnect = pool.connect()
    .then(() => {
        console.log('Conexión a base de datos exitosa');
        return pool;
    })
    .catch(error => {
        console.error('Error conectando a SQL Server:', error);
        throw error;
    });

module.exports = {
    sql,
    pool,
    poolConnect
};
