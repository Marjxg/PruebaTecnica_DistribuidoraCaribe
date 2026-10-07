const bcrypt = require('bcrypt');

const usuarios = [
    {
        nombre: 'Juan Pérez',
        nit: '123456-7',
        telefono: '5555-1111',
        email: 'juan@gmail.com',
        password: '123456'
    },
    {
        nombre: 'María López',
        nit: '987654-3',
        telefono: '5555-2222',
        email: 'maria@gmail.com',
        password: '123456'
    },
    {
        nombre: 'Pedro García',
        nit: '456789-1',
        telefono: '5555-3333',
        email: 'pedro@gmail.com',
        password: '123456'
    }
];

async function generarHashes() {

    for (const usuario of usuarios) {

        const passwordHash =
            await bcrypt.hash(usuario.password, 10);

        console.log(`
INSERT INTO cliente
(
    nombre,
    nit,
    telefono,
    email,
    password_hash,
    activo
)
VALUES
(
    '${usuario.nombre}',
    '${usuario.nit}',
    '${usuario.telefono}',
    '${usuario.email}',
    '${passwordHash}',
    1
);
        `);
    }
}

generarHashes();
