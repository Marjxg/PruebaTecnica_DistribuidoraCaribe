const errorMiddleware = (error, req, res, next) => {

    console.error(error);

    const status = error.status || 500;

    res.status(status).json({
        ok: false,
        message: error.message || 'Error interno del servidor'
    });
};

module.exports = errorMiddleware;
