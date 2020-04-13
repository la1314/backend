module.exports = (app) => {
    
    //Da nombre al exportado con el cual se irán llamando las funciones de llamada
    const db = require('../controllers/db.controller.js');

    // Obtiene datos para la página de la obra
    app.post('/api/obra-info/', db.findObraInfo);

    // Obtiene los nombres y links de las redes sociales de una obra
    app.post('/api/find-social-media/', db.findSocialMedia);

    // Update a puntuaciones with puntuacionId
    //app.put('/api/puntuaciones/actualizar', puntuaciones.update);

    // Delete a puntuaciones with puntuacionId
    //app.delete('/api/puntuaciones/:puntuacionId', puntuaciones.delete);
}
