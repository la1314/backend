const pool = require('../models/db.model.js');
const jwt = require('jsonwebtoken');
const toolF = require('./funciones.js');
const secret = process.env.TOKEN_SECRET;

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

//Obtiene la ID de una obra requerido
exports.obraID = (req, res) => {

  const { editor, name, tipo, autor } = req.query
  const query = `SELECT ID_OBRA FROM OBRAS O 
  WHERE O.ID_EDITOR = ${editor} AND O.NOMBRE LIKE "${name}" AND O.ID_TIPO = ${tipo} AND O.AUTOR LIKE "${autor}"`;

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

//Añane una nueva Obra
exports.newObra = (req, res) => {

  const { editor, name, autor, lanzamiento, estado, tipo, visibilidad } = req.query

  const query = `INSERT INTO OBRAS 
(ID_OBRA, ID_EDITOR, NOMBRE, DESCRIPCION, AUTOR, LANZAMIENTO, COVER, ID_ESTADO, ID_TIPO, VISIBILIDAD)
VALUES (NULL, "${editor}", "${name}", "","${autor}", "${lanzamiento}", "", "${estado}", "${tipo}", "${visibilidad}")`

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

// Obtiene datos para la página de la obra
exports.findObraInfo = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Nombre de la obra
   * Nombre del autor
   * Demografia
   * Sinopsis (Descipción)
   * Puntuacion
   * Cover
   * Lanzamiento
   */
  const { id: obra } = req.query
  const query = `SELECT
                  O.NOMBRE, AUTOR, DESCRIPCION, D.NOMBRE AS DEMOGRAFIA, COVER, LANZAMIENTO, AVG(PUNTOS)
                  FROM OBRAS O 
                  INNER JOIN SEGMENTADOS S ON O.ID_OBRA = S.ID_OBRA
                  INNER JOIN DEMOGRAFIAS D ON S.ID_DEMOGRAFIA = D.ID_DEMOGRAFIA
                  INNER JOIN PUNTUAN P ON O.ID_OBRA = P.ID_OBRA
                  WHERE O.ID_OBRA = ${obra}`;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }

    // if there is no error, you have the result
    //console.log(result);
    res.send(result);
  });
};

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

// Obtiene la media de una obra
exports.findAvgObra = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Media de todos los puntajes de una Obra
   */

  const { id: obra } = req.query
  const query = `SELECT AVG(PUNTOS) FROM PUNTUAN WHERE ID_OBRA = ${obra}`;

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

// Obtiene la infomación de los capítulos de una obra
exports.findInfoCaps = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID del capítulo
   * Numero del capítulo
   * Nombre del capítulo
   * Fecha en la que fue lanzado
   */

  const { id: obra } = req.query

  const query = `SELECT C.ID_CAPITULO, C.NOMBRE, C.NUMERO, C.FECHA
                 FROM CAPITULOS C
                 INNER JOIN OBRAS O ON C.ID_OBRA = O.ID_OBRA
                 WHERE O.ID_OBRA = ${obra}`;

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

// Obtiene los Capítulos que han sido leidos por un Usario en una determinada Obra
exports.findLeidos = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos leidos
   */

  const obra = req.query.id;
  const user = req.query.user;

  const query = `SELECT L.ID_CAPITULO
                 FROM LEEN L
                 INNER JOIN CAPITULOS C ON C.ID_CAPITULO = L.ID_CAPITULO
                 INNER JOIN OBRAS O ON O.ID_OBRA = C.ID_OBRA 
                 WHERE O.ID_OBRA = ${obra} AND L.ID_USUARIO = ${user}
                `;

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

//Comprueba que el usuario ingresado existe
exports.checkEditor = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Valor Booleano 0 False - 1 True
   */
  const { user } = req.query

  const query = `SELECT 
                CASE WHEN EXISTS 
                  (SELECT  E.ID_EDITOR
                  FROM EDITORES E  
                  WHERE E.USERNAME LIKE '${user}' OR E.EMAIL LIKE '${user}')
                THEN 1 
                ELSE 0 
                END AS booleano`;

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



