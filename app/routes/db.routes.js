module.exports = (app) => {
    //TODO Implementar nuevos controladores
    const withAuth = require('./middleware');

    //Da nombre al exportado con el cual se irán llamando las funciones de llamada
    const db = require('../controllers/db.controller.js');
    const dbObra = require('../controllers/db.controllerObra.js');

    // Obtiene la ID de un editor
    app.post('/api/editor-id/', db.editorID);

    // Obtiene la ID de una Obra
    app.post('/api/obra-id/', dbObra.obraID);

    // Añade una obra nueva
    app.post('/api/new-obra/', dbObra.newObra);

    // Obtiene datos para la página de la obra
    // ID
    app.post('/api/find-info-obra/', dbObra.findObraInfo);

    // Obtiene los estados
    app.post('/api/find-estados/', db.findEstados);

    // Obtiene los tipos
    app.post('/api/find-tipos/', db.findTipos);

    // Obtiene los nombres y links de las redes sociales de una obra
    // ID
    app.post('/api/find-social-media/', db.findSocialMedia);

    // Obtiene los nombres y links de las redes sociales de una obra
    // ID
    app.post('/api/find-avg-obra/', dbObra.findAvgObra);

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

        const user = req.user;
        const rol = req.rol;

        const json = {
            user: user,
            rol : rol
        }

        //res.status(200).send((user).toString())
        res.json(json)
    });

    //Consulta usada para verificar que el usuario tiene el Token para seguir logeado
    app.post('/api/clear', function (req, res) {

        res.clearCookie('token').send('1');
    });
}
