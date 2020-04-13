const connection = require('../models/db.model.js');

// Obtiene datos para la página de la obra
exports.findObraInfo = (req, res) => {

  //La query devolverá los siguientes datos:
  /**
   * Nombre de la obra
   * Nombre del autor
   * Demografia
   * Sinopsis
   * Cover
   * Rating (Media)
   * 
   */
  const obra = req.query.id;
  const query = `SELECT NOMBRE FROM OBRAS WHERE ID_OBRA = ${obra}`;

  // if there is no error, you have the result
  connection.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw err;

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

  const obra = req.query.id;
  const query = `SELECT S.NOMBRE, T.LINK FROM TIENEN T INNER JOIN SOCIAL_MEDIA S ON T.ID_SOCIAL = S.ID_SOCIAL INNER JOIN OBRAS O ON T.ID_OBRA = O.ID_OBRA WHERE O.ID_OBRA = ${obra}`;

  // if there is no error, you have the result
  connection.query(query, (err, result) => {

    // if any error while executing above query, throw error
    if (err) throw err;

    // if there is no error, you have the result
    res.send(result);
  });

};