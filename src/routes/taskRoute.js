const express = require('express');
const router = express.Router();
const {getAllTasks, addTask, updateTask, deleteTask} = require('../controllers/taskController');
const authenticate = require('../middlewares/authenticate');



//Obtener todas las tareas
router.get('/', authenticate, getAllTasks);

//Crear una nueva tarea
router.post('/', authenticate, addTask);

//Actualizar una tarea por ID
router.put('/:id', authenticate, updateTask );

//Eliminar una tarea por ID
router.delete('/:id', authenticate, deleteTask );


module.exports = router;
