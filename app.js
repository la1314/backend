const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3069;
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');

require('dotenv').config({ encoding: 'latin1' })

app.use(fileUpload());

// Parse cookies passed by our browser
app.use(cookieParser());


// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.disable('etag');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});


//Parsearemos los jsones
//app.use(bodyParser.json());


// Vamos a definir un "punto de inicio"
app.get('/api/', (req, res) => {
    res.json({ "message": "API de mcnreader" });
});

// Require bd routes
require('./app/routes/db.routes.js')(app);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send('ÒwÓ > UwU');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.post('*', function (req, res) {
    res.status(404).send('ÒwÓ > UwU');
});

// Escuchemos en un puerto
app.listen(port, () => console.log(`* [ mcnreader ] UP and Running en http://localhost: ${port}`));