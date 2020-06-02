const poolObra = require('../models/db.model.js');
const toolQueryObra = require('./funciones.js');

//Obtiene la ID de una obra requerido
exports.obraID = (req, res) => {

  const { editor, name, tipo, autor } = req.query
  const query = `SELECT ID_OBRA FROM OBRAS O 
    WHERE O.ID_EDITOR = ${editor} AND O.NOMBRE LIKE "${name}" AND O.ID_TIPO = ${tipo} AND O.AUTOR LIKE "${autor}"`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result[0]);
  });
}

//Añane una nueva Obra
exports.newObra = (req, res) => {

  const { editor, name, autor, lanzamiento, estado, tipo, visibilidad } = req.query

  const query = `INSERT INTO OBRAS 
  (ID_OBRA, ID_EDITOR, NOMBRE, DESCRIPCION, AUTOR, LANZAMIENTO, COVER, ID_ESTADO, ID_TIPO, VISIBILIDAD)
  VALUES (NULL, "${editor}", "${name}", "","${autor}", "${lanzamiento}", "https://tuinki.gupoe.com/media/default-cover.jpg", "${estado}", "${tipo}", "${visibilidad}")`

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

// Obtiene datos para la página de la obra
exports.findInfoObra = (req, res) => {

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
  const { obra } = req.query
  const query = `SELECT O.NOMBRE, O.AUTOR, O.DESCRIPCION, O.COVER, O.LANZAMIENTO,
    O.VISIBILIDAD, O.ID_ESTADO AS ESTADOVALUE, O.ID_TIPO AS TIPO, S.ID_DEMOGRAFIA AS DEMOGRAFIA,
    D.NOMBRE AS NDEMOGRAFIA, T.NOMBRE AS NTIPO, E.NOMBRE AS NESTADO
    FROM OBRAS O
    INNER JOIN SEGMENTADOS S ON S.ID_OBRA = O.ID_OBRA
    INNER JOIN DEMOGRAFIAS D ON D.ID_DEMOGRAFIA = S.ID_DEMOGRAFIA
    INNER JOIN TIPO T ON T.ID_TIPO = O.ID_TIPO
    INNER JOIN ESTADOS E ON E.ID_ESTADO = O.ID_ESTADO
    WHERE O.ID_OBRA = ${obra}`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    //console.log(result);
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
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

// Obtiene el ID y el Nombre de cada una de las obras de un editor
exports.findAllEditorObras = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID y el Nombre de cada una de las obras de un editor
   */

  const { editor } = req.query
  const query = `SELECT ID_OBRA, NOMBRE, COVER FROM OBRAS O WHERE O.ID_EDITOR = ${editor} ORDER BY NOMBRE`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

// Edita columnas de una obra dependiendo al valor de type
exports.editObra = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Actualizara los un parámetro de una obra
   */

  const { type, obra, value } = req.query
  const query = toolQueryObra.devolverQueryEditObra(type, obra, value);

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)


    // if there is no error, you have the result
    res.send(result);
  });
};


//Añade la demografia por defecto
exports.defaultDemografia = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Edita la demografia de una obra
   */

  const { obra } = req.query

  const query = `INSERT INTO SEGMENTADOS (ID_OBRA, ID_DEMOGRAFIA)
    VALUES (${obra}, 16)`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

// Devuelve las Demografias
exports.findAllDemografias = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * ID y el Nombre de cada una de las demografias
   */

  const query = `SELECT ID_DEMOGRAFIA AS ID, NOMBRE FROM DEMOGRAFIAS`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

// Edita la demografia de una obra dependiendo al valor de type
exports.editDemografia = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Edita la demografia de una obra
   */

  const { obra, demo } = req.query

  const query = `UPDATE SEGMENTADOS SET ID_DEMOGRAFIA = ${demo} WHERE ID_OBRA = ${obra}`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

// Obtiene la demografia de una obra
exports.getDemografia = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Edita la demografia de una obra
   */

  const { obra } = req.query

  const query = `SELECT D.NOMBRE AS NOMBRE, D.ID_DEMOGRAFIA AS ID FROM SEGMENTADOS S
     INNER JOIN DEMOGRAFIAS D ON D.ID_DEMOGRAFIA = S.ID_DEMOGRAFIA
     WHERE S.ID_OBRA = ${obra}
     `;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

//Devuelve los tipos de obras que pueden haber
exports.findTipos = (req, res) => {

  const query = `SELECT ID_TIPO AS ID, NOMBRE FROM TIPO`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

//Devuelve los estados que puede tener una obra
exports.findEstados = (req, res) => {

  const query = `SELECT ID_ESTADO AS ID, NOMBRE FROM ESTADOS`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

//Devuelve los generos que puede tener una obra
exports.findGeneros = (req, res) => {

  const query = `SELECT ID_GENERO AS ID, NOMBRE FROM GENEROS ORDER BY NOMBRE`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

//Devuelve los generos que puede tener una obra
exports.findGenerosActuales = (req, res) => {

  const { obra } = req.query

  const query = `SELECT C.ID_GENERO AS ID, G.NOMBRE 
    FROM CLASIFICADOS C
    INNER JOIN GENEROS G ON G.ID_GENERO = C.ID_GENERO
    WHERE C.ID_OBRA = ${obra}
    ORDER BY G.NOMBRE`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
}

//Devuelve los generos que puede tener una obra
exports.findAllSocialMedia = (req, res) => {

  const query = `SELECT ID_SOCIAL AS ID, NOMBRE FROM SOCIAL_MEDIA`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
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
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

// Devuelve el cover de una obra
exports.findCover = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Devuelve la ruta del cover de la obra actual
   */

  const { obra } = req.query
  const query = `SELECT COVER FROM OBRAS WHERE ID_OBRA = ${obra}`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result[0].COVER);
  });
};

// Devuelve la visibilidad de una obra o capítulo
//TODO CAPITULO
exports.findVisibilidad = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * OCULTO: 0, VISIBLE: 1
   */

  const { id } = req.query
  const query = `SELECT VISIBILIDAD FROM OBRAS WHERE ID_OBRA = ${id}`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

//Devuelve el nombre de un estado
exports.getEstado = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   *NOMBRE
   */

  const { id } = req.query
  const query = `SELECT NOMBRE FROM ESTADOS WHERE ID_ESTADO = ${id}`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};

//Devuelve el nombre de un estado
exports.getTipo = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   *NOMBRE
   */

  const { id } = req.query
  const query = `SELECT NOMBRE FROM TIPO WHERE ID_TIPO = ${id}`;

  // if there is no error, you have the result
  poolObra.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw new Error(err)

    // if there is no error, you have the result
    res.send(result);
  });
};





/**
 * CASE VISIBILIDAD WHEN 0 THEN 'OCULTO' ELSE 'VISIBLE' END AS VISIBILIDAD
 */