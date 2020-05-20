const pool = require('../models/db.model.js');
const jwt = require('jsonwebtoken');
const toolF = require('./funciones.js');
const secret = process.env.TOKEN_SECRET;

//TODO Dividir controladores
//Obtiene la ID del editor requerido
exports.editorID = (req, res) => {

  const { editor } = req.query
  const query = `SELECT ID_EDITOR FROM EDITORES E WHERE E.USERNAME LIKE "${editor}" OR E.EMAIL LIKE "${editor}"`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }

    // if there is no error, you have the result
    res.send(result[0]);
  });
}

// Crea un usuario nuevo
exports.createUser = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Devolvera Ok cuando el usuario sea creado
   */

  const { type, username, email, password, phone } = req.query

  const query = toolF.devolverQueryCreateUser(type, username, email, password, phone);

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }

    // if there is no error, you have the result
    res.send(result)

  });
}

//Devuelve los tipos de obras que pueden haber
exports.findTipos = (req, res) => {

  const query = `SELECT ID_TIPO, NOMBRE FROM TIPO`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }
    res.send(result);
  });
}

//TODO Refactorizar para filtar por post

//Devuelve los estados que puede tener una obra
exports.findEstados = (req, res) => {

  const query = `SELECT ID_ESTADO, NOMBRE FROM ESTADOS`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

      // if any error while executing above query, throw error
      if (err) {
          pool.release();
          throw err;
      }
      res.send(result);
  });
}

// Obtiene los datos de las redes sociales de la Obra
exports.findSocialMedia = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Nombre
   * Link
   */

  const { id: obra } = req.query
  const query = `SELECT S.NOMBRE, T.LINK FROM TIENEN T INNER JOIN SOCIAL_MEDIA S ON T.ID_SOCIAL = S.ID_SOCIAL INNER JOIN OBRAS O ON T.ID_OBRA = O.ID_OBRA WHERE O.ID_OBRA = ${obra}`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

      // if any error while executing above query, throw error
      if (err) {
          pool.release();
          throw err;
      }

      // if there is no error, you have the result
      res.send(result);
  });
};

// Obtiene un Valor Booleano para saber si un Usuario sigue o no una Obra
exports.findFollow = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Valor Booleano 0 False - 1 True
   */

  const { id: obra, user } = req.query

  const query = `SELECT 
                CASE WHEN EXISTS 
                  (SELECT  *
                  FROM SIGUEN as S  
                  WHERE S.ID_OBRA = ${obra} AND S.ID_USUARIO = ${user})
                THEN 1 
                ELSE 0 
                END AS Booleano`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }

    // if there is no error, you have the result
    res.send(result);

  });
}


//Comprueba que el usuario ingresado existe
exports.checkUser = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Valor Booleano 0 False - 1 True
   */
  const { user, type } = req.query

  const query = toolF.devolverQueryCheckUser(type, user)

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }

    // if there is no error, you have the result
    res.send(result[0]);
  });
}

//Genera TOKEN de session
exports.generateToken = (req, res) => {

  // ID del usuario guardado dentro del token como iduser
  //TODO Implementar rol
  const { user, password, type } = req.query;

  const query = toolF.devolverQueryGenerateToken(type, user, password)

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }

    // if there is no error, you have the result

    if (result != '') {

      const incognita = result[0].booleano;
      if (incognita) {

        // Issue token
        const payload = { 'user': user, 'idUser': result[0].idUser, 'idRol': result[0].idRol };
        const token = jwt.sign(payload, secret, {
          expiresIn: '5h'
        });
        res.cookie('token', token, { httpOnly: true, SameSite: 'None' })
          .status(200).send('1');
      } else {
        res.status(200).send('0');
      }
    } else {
      res.status(200).send('0');
    }
  });
}



