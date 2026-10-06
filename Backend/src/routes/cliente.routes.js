const express = require('express');

const clienteController =
    require('../controllers/cliente.controller');

const router = express.Router();


router.post('/', clienteController.crear);

router.get('/', clienteController.obtenerTodos);

router.get('/:id', clienteController.obtenerPorId);

router.put('/:id', clienteController.actualizar);

router.delete('/:id', clienteController.eliminar);


module.exports = router;
