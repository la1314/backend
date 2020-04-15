module.exports = (app) => {
    
    //Da nombre al exportado con el cual se irán llamando las funciones de llamada
    const db = require('../controllers/db.controller.js');

    // Obtiene datos para la página de la obra
    app.post('/api/find-info-obra/', db.findObraInfo);

    // Obtiene los nombres y links de las redes sociales de una obra
    app.post('/api/find-social-media/', db.findSocialMedia);

    // Obtiene los nombres y links de las redes sociales de una obra
    app.post('/api/find-avg-obra/', db.findAvgObra);

    // Obtiene la infomación de los capítulos de una obra
    app.post('/api/find-info-caps/', db.findInfoCaps);

    // Obtiene los capítulos que ha leido un usuario en una determinada Obra
    app.post('/api/find-leidos/', db.findLeidos);

    // Comprueba si un usuario sigue una obra (Devuevle el ROW 'Booleano')
    app.post('/api/find-follow/', db.findFollow);

    // Update a puntuaciones with puntuacionId
    //app.put('/api/puntuaciones/actualizar', puntuaciones.update);

    // Delete a puntuaciones with puntuacionId
    //app.delete('/api/puntuaciones/:puntuacionId', puntuaciones.delete);
}
