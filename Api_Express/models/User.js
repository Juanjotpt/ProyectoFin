const conexion = require('./conexion');
const bcrypt = require('bcryptjs');

// Verifica si el usuario existe, si la contraseña es correcta y si el rol es el esperado
const verificarUsuario = (email, password, callback) => {
  const query = `
    SELECT 
      usuarios.id_usuario, 
      usuarios.nombre, 
      usuarios.apellidos, 
      usuarios.email, 
      usuarios.password AS hashed_password,
      rol.tipo AS rol_tipo
    FROM 
      usuarios
    JOIN 
      rol ON usuarios.id_usuario = rol.id_usuario
    WHERE 
      usuarios.email = ?`;

  conexion.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return callback(err);
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      return callback(null, false); // Usuario no encontrado
    }

    const usuario = results[0];

    // Verificar la contraseña
    bcrypt.compare(password, usuario.hashed_password, (err, res) => {
      if (err) {
        console.error('Error al comparar la contraseña:', err);
        return callback(err);
      }

      if (res) {
        // Contraseña correcta, devuelve el usuario con rol_tipo
        return callback(null, {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          email: usuario.email,
          rol_tipo: usuario.rol_tipo
        });
      } else {
        console.log('Contraseña incorrecta');
        return callback(null, null); // Contraseña incorrecta
      }
    });
  });
};

module.exports = { verificarUsuario };
