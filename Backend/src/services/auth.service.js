const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRepository =
    require('../repositories/auth.repository');


const login = async (email, password) => {

    if (!email || !email.trim()) {

        const error =
            new Error('El email es obligatorio');

        error.status = 400;

        throw error;
    }


    if (!password) {

        const error =
            new Error('La contraseña es obligatoria');

        error.status = 400;

        throw error;
    }


    const emailNormalizado =
        email.trim().toLowerCase();


    const cliente =
        await authRepository.obtenerClientePorEmail(
            emailNormalizado
        );


    if (!cliente) {

        const error =
            new Error('Credenciales inválidas');

        error.status = 401;

        throw error;
    }


    if (!cliente.activo) {

        const error =
            new Error('El cliente está inactivo');

        error.status = 403;

        throw error;
    }


    if (!cliente.password_hash) {

        const error =
            new Error(
                'El cliente no tiene una contraseña configurada'
            );

        error.status = 500;

        throw error;
    }


    const passwordCorrecta =
        await bcrypt.compare(
            password,
            cliente.password_hash
        );


    if (!passwordCorrecta) {

        const error =
            new Error('Credenciales inválidas');

        error.status = 401;

        throw error;
    }


    const token = jwt.sign(
        {
            id_cliente: cliente.id_cliente,
            email: cliente.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );


    return {
        token,
        cliente: {
            id_cliente: cliente.id_cliente,
            nombre: cliente.nombre,
            nit: cliente.nit,
            telefono: cliente.telefono,
            email: cliente.email
        }
    };
};


module.exports = {
    login
};
