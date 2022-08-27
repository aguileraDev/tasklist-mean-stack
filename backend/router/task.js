const { Router } = require("express");
const { check } = require("express-validator");
const taskControl = require("../controllers/taskControl");
const validationErrors = require('../middlewares/validationErrors');
const verifyToken = require("../middlewares/verifytoken");

// iniciando ruta
const taskRouter = Router();

taskRouter.get("/", (req, res) => {
  res.send("Ingresando taskRouter");
});

taskRouter.post(
  "/create",
  
  [
  check("nombre", "formato invalido").isLength({ min: 6 }),
  validationErrors,
  verifyToken
],
  taskControl.createTask
);

taskRouter.get("/read", [verifyToken], taskControl.readTask);

taskRouter.put(
  "/update/:id",
  [
  check("nombre", "formato invalido").not().isEmpty(),
  validationErrors,
  verifyToken
],
  taskControl.updateTask
);

taskRouter.delete(
  "/delete/:id",
  [verifyToken],
  taskControl.deleteTask
);

module.exports = taskRouter;
