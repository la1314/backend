const poolChapter = require('../models/db.model.js');

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