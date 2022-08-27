const taskModel = require("../database/models/task");


const createTask = async (req, res) => {
  const { nombre } = req.body;

  const id = req.userid;
  try {
    const newTask = new taskModel({ nombre, creator: id });

    await newTask.save();

    res.status(200).json({
      estado: "correcto",
      message: `task creada`,
      newTask,
    });
  } catch (error) {
    return res.status(401).json({
      estado: "invalido",
      message: "task no creada",
      error,
    });
  }
};


const readTask = async (req, res) => {
  const id = req.userid;

  try {
    const list = await taskModel.find({ creator: id }).sort({ createdAt: -1 });

    return res.json({
      estado: true,
      message: "consulta realizada con exito",
      list,
    });
  } catch (error) {
    return res.status(404).json({
      estado: false,
      message: "tasks no encontradas",
      error,
    });
  }
};


const updateTask = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    let task = await taskModel.findByIdAndUpdate(id, {$set:{nombre}}, {new: true});

    return res.json({
      estado: true,
      message: "tarea actualizada con exito",
      task,
    });
  } catch (error) {
    return res.status(401).json({
      message: "actualizacion incorrecta, error",
      error: error,
    });
  }
};


const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    let task = await taskModel.findByIdAndRemove(id);

    return res.json({
      id,
      message: 'tarea eliminada con exito'
    })
  } catch (error) {
    return res.status(401).json({
      message: 'tarea no ha sido eliminada',
      error: error
    })
  }
};
module.exports = {
  createTask,
  readTask,
  updateTask,
  deleteTask,
};
