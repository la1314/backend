const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3069;

// Utilizaremos body-parser para "parsear lo que nos pidan"
app.use(bodyParser.urlencoded({
    extended: true
}));

//Parsearemos los jsones
app.use(bodyParser.json());


// Vamos a definir un "punto de inicio"
app.get('/api/', (req, res) => {
    res.json({ "message": "API de mcnreader" });
});

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));


// Require Puntuaciones routes
require('./app/routes/puntuaciones.routes.js')(app);

// Escuchemos en un puerto
app.listen(port, () => console.log(`* [ mcnreader ] UP and Running en http://localhost: ${port}`));