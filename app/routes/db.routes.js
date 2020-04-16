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

    //Comprueba que el usuario ingresado existe
    // USER
    app.post('/api/create-user/', db.createUser);

    //Comprueba que el usuario ingresado existe
    // USER
    app.post('/api/check-user/', db.checkUser);

    //Genera un Token de session cuando los datos de login son correctos
    // USER & PASSWORD
    app.post('/api/generate-token/', db.generateToken);

    //Consulta usada para verificar que el usuario tiene el Token para seguir logeado
    app.get('/api/checkToken', withAuth, function (req, res) {

        res.status(200).send('OK')
    });

    //Consulta usada para verificar que el usuario tiene el Token para seguir logeado
    app.get('/api/clear', function (req, res) {

        res.clearCookie('token').sendStatus(200);
    });

    // Update a puntuaciones with puntuacionId
    //app.put('/api/puntuaciones/actualizar', puntuaciones.update);

    // Delete a puntuaciones with puntuacionId
    //app.delete('/api/puntuaciones/:puntuacionId', puntuaciones.delete);
}
