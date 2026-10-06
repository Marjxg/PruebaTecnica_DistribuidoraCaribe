const API_URL = 'http://localhost:3000/api';


const request = async (endpoint, options = {}) => {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            ...options
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


export const obtenerClientes = () => {
    return request('/clientes');
};


export const obtenerCliente = (id) => {
    return request(`/clientes/${id}`);
};


export const crearCliente = (cliente) => {

    return request('/clientes', {
        method: 'POST',

        body: JSON.stringify(cliente)
    });
};


export const actualizarCliente = (id, cliente) => {

    return request(`/clientes/${id}`, {
        method: 'PUT',

        body: JSON.stringify(cliente)
    });
};


export const eliminarCliente = (id) => {

    return request(`/clientes/${id}`, {
        method: 'DELETE'
    });
};
