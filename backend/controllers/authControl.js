const user = require('../database/models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

/**
 * Toma el cuerpo de la solicitud, lo valida, verifica si el usuario existe, crea un nuevo usuario,
 * cifra la contraseña, guarda al usuario, crea una carga útil, firma la carga útil y devuelve una
 * respuesta.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @returns El usuario está siendo devuelto.
 */
const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(501).json({
      errors: errors.mapped(),
    });
  }

  const { email, username, password } = req.body;

  let userData = await user.findOne({ email });

  try {
    if (userData) {
      return res.status(500).json({
        estado: 'existe',
        message: 'user already exists',
      });
    }
    const newUser = new user({ email, username, password });

    const salt = bcryptjs.genSaltSync(12);
    newUser.password = bcryptjs.hashSync(password, salt);

    await newUser.save();

    const payload = {
      id: newUser._id,
    };

    jwt.sign(
      payload,
      process.env.secret,
      { expiresIn: process.env.token_expiration },
      (error, token) => {
        res.json({
          estado: true,
          message: 'User has been create successful',
          username,
          token,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({
      message: 'User could not be created',
    });
  }
};

/**
 * Recibe una solicitud de inicio de sesion, valida la solicitud y luego devuelve una respuesta
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @returns El token está siendo devuelto.
 */
const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(501).json({
      errors: errors.mapped(),
    });
  }

  const { email, password } = req.body;

  let userData = await user.findOne({ email });

  try {
    if (!userData) {
      return res.status(401).json({
        message: 'user or password wrong',
      });
    }

    const validatePassword = bcryptjs.compareSync(password, userData.password); //hashSync

    if (!validatePassword) {
      return res.status(401).json({
        message: 'user or password wrong',
      });
    }

    const payload = {
      id: userData._id,
    };

    jwt.sign(
      payload,
      process.env.secret,
      { expiresIn: process.env.token_expiration },
      (error, token) => {
        if (error) {
          return res.json({
            estado: false,
            event: error,
            message: 'Ha ocurrido un error',
          });
        } else {
          return res.json({
            estado: true,
            id: userData._id,
            username: userData.username,
            message: 'Sesion iniciada',
            token,
          });
        }
      }
    );
  } catch (error) {
    return res.status(400).json({
      estado: false,
      error: 'Error al logearse',
    });
  }
};

module.exports = {
  userLogin,
  registerUser,
};
