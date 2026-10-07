const authService =
    require('../services/auth.service');


const login = async (req, res, next) => {

    try {

        const { email, password } =
            req.body;


        const resultado =
            await authService.login(
                email,
                password
            );


        res.status(200).json({
            ok: true,
            message: 'Login exitoso',
            data: resultado
        });

    } catch (error) {

        next(error);
    }
};


module.exports = {
    login
};
