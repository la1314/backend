const poolChapter = require('../models/db.model.js');

//Añane un nuevo capítulo a una obra
exports.newChapter = (req, res) => {

  const { obra, name, number, date, visibilidad } = req.query

  const query = `INSERT INTO CAPITULOS 
(ID_CAPITULO, ID_OBRA, NUMERO, NOMBRE, FECHA, VISIBILIDAD)
VALUES (NULL, ${obra}, ${number}, "${name}", "${date}", ${visibilidad})`

  // if there is no error, you have the result
  poolChapter.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

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
  poolChapter.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene la infomación de los capítulos de una obra
exports.findInfoChapter = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID del capítulo
   * Numero del capítulo
   * Nombre del capítulo
   * Fecha en la que fue lanzado
   */

  const { chapter } = req.query

  const query = `SELECT C.ID_CAPITULO AS ID, C.NOMBRE, C.NUMERO, DATE_FORMAT(FECHA, "%Y-%m-%d") AS FECHA, C.VISIBILIDAD
                   FROM CAPITULOS C
                   WHERE C.ID_CAPITULO = ${chapter}`;

  // if there is no error, you have the result
  poolChapter.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result[0]);
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
  poolChapter.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene los Capítulos de una determinada Obra
exports.findChapters = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID de los capítulos que tenga una obra
   */

  const { obra } = req.query;

  const query = `SELECT L.ID_CAPITULO AS ID, L.NUMERO, L.NOMBRE FROM CAPITULOS L WHERE L.ID_OBRA = ${obra} ORDER BY L.NUMERO`;

  // if there is no error, you have the result
  poolChapter.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene los Capítulos de una determinada Obra
exports.findChaptersPages = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * RUTA, NUMERO
   */

  const { chapter } = req.query;

  const query = `SELECT RUTA, NUMERO FROM PAGINAS WHERE ID_CAPITULO = ${chapter} ORDER BY NUMERO`;

  // if there is no error, you have the result
  poolChapter.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Añade paginas un capitulo
exports.addChapterPages = (req, res) => {

  const { chapter, rutas, numeros } = req.query;

  //TODO GENERAR QUERY

  let cadena = `INSERT INTO PAGINAS (ID_PAGINA, ID_CAPITULO, RUTA, NUMERO) VALUES`;

  const regex = /"/gi;
  const regex2 = /}/gi;

  for (let index = 0; index < numeros.length; index++) {

    let ruta = rutas[index].split(':');
    ruta = ruta[1].replace(regex, '').replace(regex2, '');
    let number = numeros[index];

    if (index !== numeros.length-1) {

      cadena += " (NULL,"+chapter+", 'https://tuinki.gupoe.com/media/"+ruta+"', "+number+"),";

    } else {
      cadena += "(NULL, "+chapter+", 'https://tuinki.gupoe.com/media/"+ruta+"', "+number+")";
    }
  }

  const query = cadena;

  // if there is no error, you have the result
  poolChapter.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}