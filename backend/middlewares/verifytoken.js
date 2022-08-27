const jwt = require('jsonwebtoken');


/**
 * Comprueba si el token es válido y, si lo es, permite al usuario acceder a la ruta.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @param next - Esta es una función a la que llama cuando desea pasar el control a la siguiente
 * función de middleware.
 * @returns El token está siendo devuelto.
 */
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      estado: 'invalido',
      message: 'token invalido',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.secret);
    req.userid = payload.id;

    next();
  } catch (error) {
    return res.status(401).json({
      estado: 'invalido',
      message: 'token invalido',
    });
  }
};

module.exports = verifyToken;