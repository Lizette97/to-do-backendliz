const taskModel = require ('../models/taskModel');

const getAllTasks = async (req, res) => {
    try{
        const tasks = await taskModel.getAllTasksByUserId(req.res.id);
        res.json(tasks);
    } catch(error){
        console.error('Error al obtener las tareas: ', error.message);
        res.status(500).json({message: 'Error al obtener las tareas'});
    }
};

//Obtener por id de la tarea
const getTask = async (req, res) => {
    try{
        const task = await taskModel.getTaskByIdAndUserId(req.params.id, req.user.id);
        if(!task){
            return res.status(404).json({message: 'Tarea no encontrada o no pertenece al usuario'});
        }
        res.json(task);
    }catch(error){
        console.error('Error al obtener la tarea: ', error.message);
        res.status(500).json({message: 'Error al obtener la tarea'});
    }
};



const addTask = async (req, res) => {
    const { title, status} = req.body;

    if(!title || !status){
        return res.status(400).json({message: 'Son obligatorios los campos title y status'});
    }
    try{
        const newTask = await taskModel.createTask({
            title,
            status,
            userId: req.user.user.id
        });
        res.status(201).json (newTask);
    }catch(error){
        console.error('Error al crear la tarea: ', error);
        res.status(500).json({message: 'Error al crear la tarea'});
    }
};




const updateTask = async (req, res) => {
    try{
        const task = await taskModel.getTaskByIdAndUserId(req.params.id, req.user.id);
        if(!task){
            return res.status(404).json({message: 'Tarea no encontrada o no pertenece al usuario'});
        }
        const updateTask = await taskModel.updateTask(req.params.id, req.body);
        res.json(updateTask);
    }catch (error){
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({message: 'Error al actualizar la tarea'});

    }
};


const deleteTask = async (req, res) => {
    try{
        const task = await taskModel.getTaskByIdAndUserId(req.params.id, req.user.id);
        if(!task){
            return res.status(404).json({message: 'Tarea no encontrada o no pertenece al usuario'});
        }
        await taskModel.deleteTask(req.params.id);
        res.json({message: 'Tarea eliminada correctamente'});
    }catch(error){
        console.error( 'Error al eliminar la tarea', error);
        res.status(500).json({message: 'Error al eliminar la tarea'});
    }
};


module.exports = {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask
};
