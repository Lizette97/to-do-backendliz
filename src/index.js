const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middleware
app.use(cors(
    {
        origin: 'http://localhost:5173',               
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentiales: true  //Permite enviar cookies y encabezados de autenticazión
    }
));
app.use(express.json());


//Rutas
const taskRoutes = require('./routes/taskRoute');
app.use('/api/tasks', taskRoutes);


// Rutas para crear usuarios
const userRoutes = require('./routes/userRoute');
app.use('/api/users', userRoutes);

//Inicializar el servidor
const authRoutes = require('./routes/authRoute');
app.use('/api/auth', authRoutes);

//Inicializar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
})
