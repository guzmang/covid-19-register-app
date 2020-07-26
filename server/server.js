require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

const app = express();
const db = require('./database');

// CORS configuration
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuración global de rutas
app.use(require('./routes'));

db.connect();

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});