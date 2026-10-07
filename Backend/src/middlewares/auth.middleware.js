const jwt = require('jsonwebtoken');


const autenticar = (req, res, next) => {

    try {

        const authorization =
            req.headers.authorization;


        if (!authorization) {

            return res.status(401).json({
                ok: false,
                message: 'Token no proporcionado'
            });
        }


        const [tipo, token] =
            authorization.split(' ');


        if (
            tipo !== 'Bearer' ||
            !token
        ) {

            return res.status(401).json({
                ok: false,
                message: 'Formato de token inválido'
            });
        }


        const payload =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        req.usuario = payload;


        next();

    } catch (error) {

        return res.status(401).json({
            ok: false,
            message: 'Token inválido o expirado'
        });
    }
};


module.exports = {
    autenticar
};
