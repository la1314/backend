const pool = require('../models/db.model.js');
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

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

// Crea un usuario nuevo
exports.createUser = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Devolvera Ok cuando el usuario sea creado
   */

  const { username, email, password } = req.query
  const recover = Math.floor(Math.random() * (9999999999 - 1111111111)) + 1111111111;

  const query = `INSERT INTO USUARIOS (ID_USUARIO, EMAIL, USERNAME, PASSWORD, RECOVER)
                 VALUES (NULL, "${email}", "${username}", "${password}", ${recover})
                 `;

  // if there is no error, you have the result
  pool.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) {
      pool.release();
      throw err;
    }

    // if there is no error, you have the result
    res.status(200).send('OK');

  });
}


//Comprueba que el usuario ingresado existe
exports.checkUser = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Valor Booleano 0 False - 1 True
   */

  const { user } = req.query

  const query = `SELECT 
                CASE WHEN EXISTS 
                  (SELECT  U.ID_USUARIO
                  FROM USUARIOS U  
                  WHERE U.USERNAME LIKE '${user}' OR U.EMAIL LIKE '${user}')
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

  const { user, password } = req.query;

  const query = `SELECT 
                  (CASE WHEN PASSWORD LIKE '${password}' THEN 1 ELSE 0 END) AS booleano,
                  ID_USUARIO AS idUser
                  FROM
                  USUARIOS
                  WHERE
                  EMAIL LIKE '${user}' OR USERNAME LIKE '${user}'
                  `;

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
        const payload = { 'user': user, 'idUser': result[0].idUser };
        const token = jwt.sign(payload, secret, {
          expiresIn: '5h'
        });
        res.cookie('token', token, { httpOnly: true })
          .status(200).send('1');
      } else {
        res.status(200).send('0');
      }
    } else {
      res.status(200).send('0');
    }


  });
}



