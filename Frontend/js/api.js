const API_URL = 'http://localhost:3000/api';

const request = async (endpoint, options = {}) => {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,

            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || 'Error en la petición'
        );
    }


    return data;
};


export const login = (email, password) => {

    return request('/auth/login', {

        method: 'POST',

        body: JSON.stringify({
            email,
            password
        })

    });


};

export const guardarSesion = (data) => {

    localStorage.setItem(
        'token',
        data.token
    );

    localStorage.setItem(
        'usuario',
        JSON.stringify({
            id_cliente: data.id_cliente,
            nombre: data.nombre,
            email: data.email
        })
    );


};

export const obtenerToken = () => {

    return localStorage.getItem('token');


};

export const cerrarSesion = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');


};

export const obtenerUsuario = () => {

    const usuario =
        localStorage.getItem('usuario');

    return usuario
        ? JSON.parse(usuario)
        : null;


};

export const obtenerClientes = () => {

    return request('/clientes', {

        headers: {
            Authorization:
                `Bearer ${obtenerToken()}`
        }

    });


};

export const obtenerCliente = (id) => {

    return request(`/clientes/${id}`, {

        headers: {
            Authorization:
                `Bearer ${obtenerToken()}`
        }

    });


};

export const crearCliente = (cliente) => {

    return request('/clientes', {

        method: 'POST',

        headers: {
            Authorization:
                `Bearer ${obtenerToken()}`
        },

        body: JSON.stringify(cliente)

    });


};

export const actualizarCliente = (id, cliente) => {

    return request(`/clientes/${id}`, {

        method: 'PUT',

        headers: {
            Authorization:
                `Bearer ${obtenerToken()}`
        },

        body: JSON.stringify(cliente)

    });


};

export const eliminarCliente = (id) => {

    return request(`/clientes/${id}`, {

        method: 'DELETE',

        headers: {
            Authorization:
                `Bearer ${obtenerToken()}`
        }

    });


};