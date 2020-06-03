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
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result[0]);
  });
}

// Crea un usuario nuevo
exports.createUser = (req, res) => {

  const { type, username, email, password, phone } = req.query

  const query = toolF.devolverQueryCreateUser(type, username, email, password, phone);

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result)

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
    if (err) throw new Error(err)

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
    if (err) throw new Error(err)

    // if there is no error, you have the result

    if (result != '') {

      const incognita = result[0].booleano;
      if (incognita) {

        // Issue token
        const payload = { 'user': user, 'idUser': result[0].idUser, 'idRol': result[0].idRol };
        const token = jwt.sign(payload, secret, {
          expiresIn: '48h'
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

/** Querys realacionadas a Vista del Lector **/

// Obtiene un Valor Booleano para saber si un Usuario sigue o no una Obra
exports.findFollow = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Valor Booleano 0 False - 1 True
   */

  const { id: obra, user } = req.query

  const query = `SELECT CASE WHEN EXISTS (SELECT * FROM SIGUEN AS S 
                  WHERE S.ID_OBRA = ${obra} AND S.ID_USUARIO = ${user})
                  THEN 1 ELSE 0 END AS Booleano`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);

  });
}

// Obtiene los Capítulos que han sido leidos por un Usario en una determinada Obra
exports.findLeidos = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos leidos
   */

  const { obra, user } = req.query

  const query = `SELECT L.ID_CAPITULO
                   FROM LEEN L
                   INNER JOIN CAPITULOS C ON C.ID_CAPITULO = L.ID_CAPITULO
                   INNER JOIN OBRAS O ON O.ID_OBRA = C.ID_OBRA 
                   WHERE O.ID_OBRA = ${obra} AND L.ID_USUARIO = ${user}`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene los Capítulos que han sido leidos por un Usario en una determinada Obra
exports.findRecientes = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos leidos
   */

  const query = `SELECT O.NOMBRE, C.ID_OBRA AS OBRA, DATE_FORMAT(C.FECHA, "%d-%m-%Y") AS FECHA, O.COVER, T.NOMBRE AS TIPO 
                  FROM CAPITULOS C 
                  INNER JOIN OBRAS O ON O.ID_OBRA = C.ID_OBRA 
                  INNER JOIN TIPO T ON T.ID_TIPO = O.ID_TIPO
                  WHERE C.VISIBILIDAD = 1 AND O.VISIBILIDAD = 1
                  GROUP BY OBRA ORDER BY C.FECHA DESC LIMIT 25`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene los Capítulos que han sido leidos por un Usario en una determinada Obra
exports.findUserDetails = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos leidos
   */

  const user = req.rol;

  const query = `SELECT EMAIL, USERNAME FROM USUARIOS WHERE ID_USUARIO = ${user}`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene los Capítulos que han sido leidos por un Usario en una determinada Obra
exports.checkUserPassword = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos leidos
   */

  const user = req.rol;

  const query = `SELECT (CASE WHEN PASSWORD LIKE '${password}' THEN 1 ELSE 0 END) AS booleano
  FROM USUARIOS 
  WHERE ID_USUARIO = '${user}`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene los Capítulos que han sido leidos por un Usario en una determinada Obra
exports.findEditorDetails = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos leidos
   */

  const user = req.rol;

  const query = `SELECT EMAIL, USERNAME, PHONE FROM EDITORES WHERE ID_EDITOR = ${user}`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene los Capítulos que han sido leidos por un Usario en una determinada Obra
exports.checkEditorPassword = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos leidos
   */
  const user = req.rol;

  const query = `SELECT (CASE WHEN PASSWORD LIKE '${password}' THEN 1 ELSE 0 END) AS booleano
  FROM EDITORES 
  WHERE ID_EDITOR = '${user}`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}
