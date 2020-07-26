const express = require('express');
const cors = require('cors');

const PersonService = require('../services/person-service');
const { dnaValidator, queryValidator } = require('../middlewares');
const app = express();
const personService = new PersonService();

const whiteList = [
    'http://localhost:4200/',
    'https://covid-19-register-app.herokuapp.com/'
];

const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== 1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.get('/covid/checks', cors(corsOptions), personService.getAllPersons);

app.post('/covid/checks', [cors(corsOptions), dnaValidator], personService.savePerson);

app.get('/covid/stats', cors(corsOptions), personService.getStatistics);

app.get('/covid/checks/search', [cors(corsOptions), queryValidator], personService.getPersonsByCountryAndResult);

app.get('/covid/checks/:id', cors(corsOptions), personService.getPersonById);

module.exports = app;