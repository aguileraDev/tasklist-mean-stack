const {validationResult} = require('express-validator');

/**
 * Si hay errores, devuelve un error 501 con los errores asignados. De lo contrario, continúe con el
 * siguiente middleware.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @param next - La siguiente función de middleware en la pila.
 * @returns Se devuelve el objeto de errores.
 */
const validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(501).json({
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = validationErrors;