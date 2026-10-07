import {
    login,
    guardarSesion
} from './api.js';

const formLogin =
    document.getElementById('formLogin');

const email =
    document.getElementById('email');

const password =
    document.getElementById('password');

const mensaje =
    document.getElementById('mensaje');

const btnLogin =
    document.getElementById('btnLogin');

formLogin.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();


        const emailValue =
            email.value.trim();

        const passwordValue =
            password.value;


        if (!emailValue || !passwordValue) {

            mostrarMensaje(
                'Ingrese su email y contraseña.',
                'error'
            );

            return;
        }


        try {

            btnLogin.disabled = true;

            btnLogin.textContent =
                'Iniciando sesión...';


            const response =
                await login(
                    emailValue,
                    passwordValue
                );


            guardarSesion(response.data);


            window.location.href =
                './index.html';


        } catch (error) {

            mostrarMensaje(
                error.message,
                'error'
            );

        } finally {

            btnLogin.disabled = false;

            btnLogin.textContent =
                'Iniciar sesión';
        }

    }


);

const mostrarMensaje = (
    texto,
    tipo
) => {

    mensaje.textContent = texto;

    mensaje.className =
        `mensaje ${tipo}`;


};