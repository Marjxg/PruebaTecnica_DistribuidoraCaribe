const express = require('express');
const cors = require('cors');

const clienteRoutes = require('./routes/cliente.routes');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message:"API funciona"
    })
})
app.use('/api/clientes', clienteRoutes);
app.use('/api/auth', authRoutes);
app.use(errorMiddleware);


module.exports = app;