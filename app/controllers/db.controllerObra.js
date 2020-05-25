const poolObra = require('../models/db.model.js');

//Obtiene la ID de una obra requerido
exports.obraID = (req, res) => {

    const { editor, name, tipo, autor } = req.query
    const query = `SELECT ID_OBRA FROM OBRAS O 
    WHERE O.ID_EDITOR = ${editor} AND O.NOMBRE LIKE "${name}" AND O.ID_TIPO = ${tipo} AND O.AUTOR LIKE "${autor}"`;

    // if there is no error, you have the result
    poolObra.query(query, (err, result) => {

        // if any error while executing above query, throw error
        if (err) {
            poolObra.release();
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
  VALUES (NULL, "${editor}", "${name}", "","${autor}", "${lanzamiento}", "https://tuinki.gupoe.com/media/default-cover.jpg", "${estado}", "${tipo}", "${visibilidad}")`

    // if there is no error, you have the result
    poolObra.query(query, (err, result) => {

        // if any error while executing above query, throw error
        if (err) {
            poolObra.release();
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
    const { obra } = req.query
    const query = `SELECT
                    O.NOMBRE, AUTOR, DESCRIPCION, D.NOMBRE AS DEMOGRAFIA, COVER, LANZAMIENTO, AVG(PUNTOS) as MEDIA
                    FROM OBRAS O 
                    INNER JOIN SEGMENTADOS S ON O.ID_OBRA = S.ID_OBRA
                    INNER JOIN DEMOGRAFIAS D ON S.ID_DEMOGRAFIA = D.ID_DEMOGRAFIA
                    INNER JOIN PUNTUAN P ON O.ID_OBRA = P.ID_OBRA
                    WHERE O.ID_OBRA = ${obra}`;

    // if there is no error, you have the result
    poolObra.query(query, (err, result) => {

        // if any error while executing above query, throw error
        if (err) {
            poolObra.release();
            throw err;
        }

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
        if (err) {
            poolObra.release();
            throw err;
        }

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
        if (err) {
            poolObra.release();
            throw err;
        }

        // if there is no error, you have the result
        res.send(result);
    });
};