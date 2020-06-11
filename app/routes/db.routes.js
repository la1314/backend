module.exports = (app) => {
    //TODO Implementar nuevos controladores
    const withAuth = require('./middleware');

    //Da nombre al exportado con el cual se irán llamando las funciones de llamada
    const dbU = require('../controllers/db.controllerUsers.js');
    const dbO = require('../controllers/db.controllerObra.js');
    const dbC = require('../controllers/db.controllerChapter.js');

    /** Lectores y Editores **/
    // Obtiene la ID de un editor -> editor (String)
    app.post('/api/editor-id/', dbU.editorID);

    //Comprueba que el usuario ingresado existe -> type, username, email, password, phone
    app.post('/api/create-user/', dbU.createUser);

    
    //Comprueba que el usuario ingresado existe -> user, type
    app.post('/api/check-user/', dbU.checkUser);

    //Comprueba que el email ingresado existe -> username
    app.post('/api/check-username/', withAuth, dbU.checkUsername);

    //Comprueba que el email ingresado existe -> email 
    app.post('/api/check-email/', withAuth, dbU.checkEmail);

    //Edita el username ingresado
    app.post('/api/edit-username/', withAuth, dbU.editUsername);

    //Edita el email ingresado
    app.post('/api/edit-email/', withAuth, dbU.editEmail);

    //Edita el phone ingresado
    app.post('/api/edit-phone/', withAuth, dbU.editPhone);

    //Devuelve los datos del usuario actual
    app.post('/api/find-user-details/', withAuth, dbU.findUserDetails);

    //Comprueba la contraseña del usuario actual
    app.post('/api/check-user-password/', withAuth, dbU.checkUserPassword);

    //Edita la contraseña del usuario actual
    app.post('/api/edit-user-password/', withAuth, dbU.editUserPassword);

    //Devuelve los datos del editor actual
    app.post('/api/find-editor-details/', withAuth, dbU.findEditorDetails);

    //Comprueba la contraseña del editor actual
    app.post('/api/check-editor-password/', withAuth, dbU.checkEditorPassword);

    //Edita la contraseña del Editor actual
    app.post('/api/edit-editor-password/', withAuth, dbU.editEditorPassword);

    //Edita el phone ingresado -> tipo (id tipo)
    app.post('/api/check-reader/', withAuth, dbU.checkReader);

    //Edita el phone ingresado -> tipo (id tipo)
    app.post('/api/create-reader/', withAuth, dbU.createReader);

    //Edita el phone ingresado -> tipo (id tipo)
    app.post('/api/find-lectores/', withAuth, dbU.findLectores);

    // Actualiza los valores de las columnas CASCADA y PAGINADA
    app.post('/api/update-reader-pc/', withAuth, dbU.updateReaderPC);

    // Actualiza los valores de las columnas ORIENTAL y OCCIDENTAL
    app.post('/api/update-reader-oroc/', withAuth, dbU.updateReaderOROC);

    // Obtiene la configuración de un lector de un cierto tipo
    app.post('/api/find-lector-tipo/', withAuth, dbU.findLectorTipo);


    /** Obras **/
    // Añade una obra nueva -> editor, name, autor, lanzamiento, estado, tipo, visibilidad
    app.post('/api/new-obra/', dbO.newObra);

    // Obtiene la ID de una Obra ->  editor, name, tipo, autor
    app.post('/api/obra-id/', dbO.obraID);

    // Obtiene datos para la página de la obra -> obra (id obra)
    app.post('/api/find-info-obra/', dbO.findInfoObra);

    // Obtiene los nombres y links de las redes sociales de una obra -> obra, media
    app.post('/api/new-social-media/', withAuth, dbO.newSocialMedia);

    // Obtiene los nombres y links de las redes sociales de una obra -> obra, media
    app.post('/api/delete-social-media/', withAuth, dbO.deleteSocialMedia);

    // Obtiene los nombres y links de las redes sociales de una obra -> id
    app.post('/api/find-social-media/', withAuth, dbO.findSocialMedia);

    // Comprueba que la obra tenga creada la social media
    app.post('/api/check-social-media/', withAuth, dbO.checkSocialMedia);

    // Actualiza el link de la social media de una obra
    app.post('/api/update-social-media/', withAuth, dbO.updateSocialMedia);

    // Obtiene los estados
    app.post('/api/find-estados/', dbO.findEstados);

    // Obtiene los estados
    app.post('/api/find-cover/', dbO.findCover);

    // Obtiene los generos que puede tener una obra
    app.post('/api/find-generos/', dbO.findGeneros);

    // Obtiene los generos actuales de una obra
    app.post('/api/find-generos-actuales/', dbO.findGenerosActuales);

    // Obtiene los tipos
    app.post('/api/find-tipos/', dbO.findTipos);

    // Obtiene las social media
    app.post('/api/find-socialMedia/', dbO.findAllSocialMedia);

    // Obtiene datos de todas las obras de un editor -> editor (id editor)
    app.post('/api/find-all-editor-obras/', dbO.findAllEditorObras);

    //Añade la demografia por defecto a una obra nueva
    app.post('/api/default-demografia/', dbO.defaultDemografia);

    // Devuelve las Demografias
    app.post('/api/find-demografias/', dbO.findAllDemografias);

    // Edita la demografia de una obra
    app.post('/api/edit-demografia/', dbO.editDemografia);

    // Obtiene la demografia de una obra
    app.post('/api/get-demografia/', dbO.getDemografia);

    // Obtiene el nombre y el id de un estado
    app.post('/api/get-estado/', dbO.getEstado);

    // Obtiene el tipo de una obra
    app.post('/api/get-tipo/', dbO.getTipo);

    // Edita los parámetros de una obra -> type (int), obra (id obra), value (Valor nuevo)
    // Type: 1:NOMBRE, 2:AUTOR, 3:LANZAMIENTO, 4: DESCRIPTION, 5:COVER
    app.post('/api/edit-obra/', withAuth, dbO.editObra);

    // Recupera la puntuación del lector -> obra
    app.post('/api/new-user-vote/', withAuth, dbO.newUserVote);

    //Comprueba si el lector ha votado
    app.post('/api/update-user-vote/', withAuth, dbO.updateUserVote);

    // Recupera la puntuación del lector -> obra
    app.post('/api/find-user-vote/', withAuth, dbO.findUserVote);

    //Comprueba si el lector ha votado
    app.post('/api/check-user-vote/', withAuth, dbO.checkUserVote);

    // Obtiene la media de una obra -> id
    app.post('/api/find-avg-obra/', withAuth, dbO.findAvgObra);

    /** Capítulos y paginas **/

    // Añade un nuevo capitulo -> obra, number, name, date, visibilidad
    app.post('/api/new-chapter/', withAuth, dbC.newChapter);

    // Obtiene la infomación de los capítulos de una obra -> id
    app.post('/api/find-info-caps/', dbC.findInfoCaps);

    // Devuelve los capitulos de una obra -> obra (id obra)
    app.post('/api/find-chapters/', withAuth, dbC.findChapters);

    // Devuelve los capitulos de una obra -> obra (id obra)
    app.post('/api/find-info-chapter/', withAuth, dbC.findInfoChapter);

    // Devuelve los capitulos de una obra -> chapter (id capitulo)
    app.post('/api/find-chapter-pages/', dbC.findChaptersPages);

    // Añade paginas un capitulo -> chapter (id capitulo), rutas, numeros
    app.post('/api/add-chapter-pages/', withAuth, dbC.addChapterPages);

    // Elimina paginas un capitulo -> chapter (id capitulo), rutas, numeros
    app.post('/api/delete-page/', withAuth, dbC.deletePage);

    // Edita dependiendo al valor de type los parámetros de un capítulo o pagina -> type, id, value
    app.post('/api/edit-chapter-pages/', withAuth, dbC.editChapterAndPages);

    // Edita el numero de una pagina -> page (ID pagina), value
    app.post('/api/edit-page-number/', withAuth, dbC.editPageNumber);

    // Edita el estilo de una pagina -> page (ID pagina), value
    app.post('/api/edit-page-style/', withAuth, dbC.editPageStyle);


    /** Token **/
    //Genera un Token de session cuando los datos de login son correctos -> user, password, type
    app.post('/api/generate-token/', dbU.generateToken);

    //Consulta usada para verificar que el usuario tiene el Token para seguir logeado
    app.get('/api/checkToken', withAuth, function (req, res) {

        const user = req.user;
        const rol = req.rol;

        const json = { user: user, rol: rol }

        //res.status(200).send((user).toString())
        res.json(json)
    });

    /** Consultar compartidas **/
    // Edita la visibilidad de una obra o capítulo
    app.post('/api/find-visibilidad/', dbO.findVisibilidad);

    //Consulta usada para verificar que el usuario tiene el Token para seguir logeado
    app.post('/api/clear', function (req, res) {

        res.clearCookie('token').send('1');
    });

    /** Vista del Lector **/

    // añade una obra a las seguidas por el usuario -> obra
    app.post('/api/follow-obra/', withAuth, dbU.followObra);

    // elimina una obra de las seguidas por el usuario -> obra
    app.post('/api/unfollow-obra/', withAuth, dbU.unfollowObra);

    // Comprueba si un usuario sigue una obra (Devuevle el ROW 'Booleano') -> obra
    app.post('/api/find-follow/', withAuth, dbU.findFollow);

    // Obtiene los capítulos que ha leido un usuario en una determinada Obra
    //ID & USER
    app.post('/api/find-leidos/', withAuth, dbU.findLeidos);

    //Obtiene las últimas 25 obras que han subido un nuevo capítulo
    app.post('/api/find-recientes/', withAuth, dbU.findRecientes);

     // Buscar las 10 Obras con mejor media
     app.post('/api/find-top-10/', withAuth, dbU.findTop10);

    //Obtiene la lista de obras seguidas por el usuario
    app.post('/api/get-list-follow/', withAuth, dbU.getListFollow);

    //Obitne la lista de capitulos pendientes del usuario
    //Obtiene la lista de obras seguidas por el usuario
    app.post('/api/get-no-leidos/', withAuth, dbU.getNoLeidos);

    //Comprueba si el capítulo ha sido leido por el usuario
    app.post('/api/check-leido/', withAuth, dbU.checkLeido);

    // Crea un capítulo leido
    app.post('/api/new-leido/', withAuth, dbU.newLeido);

    // Elimina de leidos un capítulo
    app.post('/api/delete-leido/', withAuth, dbU.deleteLeido);

    // Obtiene las iniciales de las obras
    app.post('/api/find-first-letra/', withAuth, dbU.findFirstLetra);

    // Obtiene una lista de obras a traves de una letra
    app.post('/api/find-by-letra/', withAuth, dbU.findObraByLetra);

}
