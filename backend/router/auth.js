const { Router } = require("express");
const authControl = require("../controllers/authControl");
const { check } = require("express-validator");

const authRouter = new Router();

authRouter.get("/", (req, res) => {
  res.send("utilizando authRouter en localhost:3000/auth");
});

authRouter.post(
  "/register",
  [
    check("email", "formato invalido").isEmail(),
    check("password", "La contraseña requiere al menos 6 caracteres").isLength({
      min: 6,
      max: 18,
    }),
    check("username", "nombre de usuario es requerido").not().isEmpty(),
  ],
  authControl.registerUser
);

authRouter.post(
  "/login",
  [
    check("email", "formato invalido").isEmail(), 
    check("password", "La contraseña requiere al menos 6 caracteres").isLength({
      min: 6,
      max: 18,
    })
  ],
  authControl.userLogin
);

module.exports = authRouter;
