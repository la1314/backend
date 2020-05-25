module.exports = (app) => {
    //TODO Implementar nuevos controladores
    const withAuth = require('./middleware');

    //Da nombre al exportado con el cual se irán llamando las funciones de llamada
    const db = require('../controllers/db.controller.js');
    const dbO = require('../controllers/db.controllerObra.js');
    const dbC = require('../controllers/db.controllerChapter.js');

    /** Lectores y Editores **/
    // Obtiene la ID de un editor -> editor (String)
    app.post('/api/editor-id/', db.editorID);

    //Comprueba que el usuario ingresado existe -> type, username, email, password, phone
    app.post('/api/create-user/', db.createUser);

    //Comprueba que el usuario ingresado existe -> user, type
    app.post('/api/check-user/', db.checkUser);


    /** Obras **/
    // Añade una obra nueva -> editor, name, autor, lanzamiento, estado, tipo, visibilidad
    app.post('/api/new-obra/', dbO.newObra);

    // Obtiene la ID de una Obra ->  editor, name, tipo, autor
    app.post('/api/obra-id/', dbO.obraID);

    // Obtiene datos para la página de la obra -> obra (id obra)
    app.post('/api/find-info-obra/', dbO.findObraInfo);

    // Obtiene los nombres y links de las redes sociales de una obra -> id
    app.post('/api/find-social-media/', db.findSocialMedia);

    // Obtiene la media de una obra -> id
    app.post('/api/find-avg-obra/', dbO.findAvgObra);

    // Obtiene los estados
    app.post('/api/find-estados/', db.findEstados);

    // Obtiene los tipos
    app.post('/api/find-tipos/', db.findTipos);

    // Comprueba si un usuario sigue una obra (Devuevle el ROW 'Booleano') -> id(id obra), user(id user)
    app.post('/api/find-follow/', db.findFollow);

    // Obtiene datos de todas las obras de un editor -> editor (id editor)
    app.post('/api/find-all-editor-obras/', dbO.findAllEditorObras);


    /** Capítulos y paginas **/
    // Obtiene la infomación de los capítulos de una obra -> id
    app.post('/api/find-info-caps/', dbC.findInfoCaps);

    // Obtiene los capítulos que ha leido un usuario en una determinada Obra
    //ID & USER
    app.post('/api/find-leidos/', dbC.findLeidos);


    /** Token **/
    //Genera un Token de session cuando los datos de login son correctos -> user, password, type
    app.post('/api/generate-token/', db.generateToken);

    //Consulta usada para verificar que el usuario tiene el Token para seguir logeado
    app.get('/api/checkToken', withAuth, function (req, res) {

        const user = req.user;
        const rol = req.rol;

        const json = {
            user: user,
            rol: rol
        }

        //res.status(200).send((user).toString())
        res.json(json)
    });

    //Consulta usada para verificar que el usuario tiene el Token para seguir logeado
    app.post('/api/clear', function (req, res) {

        res.clearCookie('token').send('1');
    });
}
