const express = require('express');

const clienteRoutes = require('./routes/cliente.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message:"API funciona"
    })
    app.listen(PORT, () => {
        console.log(`Servidor funcionando ${PORT}`);
    })
})
app.use('/api/clientes', clienteRoutes);
app.use(errorMiddleware);


module.exports = app;
