const conexion = require('./conexion');
const bcrypt = require('bcryptjs');

// Verifica si el usuario existe y si la contraseña es correcta
const verificarUsuario = (email, password, callback) => {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  conexion.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, false); // Usuario no encontrado
    }

    const usuario = results[0];
    bcrypt.compare(password, usuario.password, (err, res) => {
      if (err) {
        return callback(err);
      }
      if (res) {
        return callback(null, usuario); // Contraseña correcta
      } else {
        return callback(null, null); // Contraseña incorrecta
      }
    });
  });
};

module.exports = { verificarUsuario };
