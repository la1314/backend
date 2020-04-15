module.exports = (app) => {

    const withAuth = require('./middleware');

    //Da nombre al exportado con el cual se irán llamando las funciones de llamada
    const db = require('../controllers/db.controller.js');

    // Obtiene datos para la página de la obra
    // ID
    app.post('/api/find-info-obra/', db.findObraInfo);

    // Obtiene los nombres y links de las redes sociales de una obra
    // ID
    app.post('/api/find-social-media/', db.findSocialMedia);

    // Obtiene los nombres y links de las redes sociales de una obra
    // ID
    app.post('/api/find-avg-obra/', db.findAvgObra);

    // Obtiene la infomación de los capítulos de una obra
    // ID & USER
    app.post('/api/find-info-caps/', db.findInfoCaps);

    // Obtiene los capítulos que ha leido un usuario en una determinada Obra
    //ID & USER
    app.post('/api/find-leidos/', db.findLeidos);

    // Comprueba si un usuario sigue una obra (Devuevle el ROW 'Booleano')
    // ID & USER
    app.post('/api/find-follow/', db.findFollow);

    app.post('/api/generate-token/', db.generateToken);

    app.get('/api/checkToken', withAuth, function (req, res) {
        res.status(200).send('OK')
    });

    // Update a puntuaciones with puntuacionId
    //app.put('/api/puntuaciones/actualizar', puntuaciones.update);

    // Delete a puntuaciones with puntuacionId
    //app.delete('/api/puntuaciones/:puntuacionId', puntuaciones.delete);
}
