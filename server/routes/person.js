const express = require('express');

const Person = require('../models/person');
const { dnaValidator } = require('../middlewares/dnaVerifier');
const { queryValidator } = require('../middlewares/queryVerifier');
const { countByStatus } = require('../utils/utils');

const app = express();

app.get('/covid/checks', async(req, res) => {

    try {
        await Person.find()
            .exec((err, persons) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    persons
                });

            });
    } catch (e) {
        console.error(e);
    }

});

app.post('/covid/checks', dnaValidator, async(req, res) => {

    let body = req.body;

    let person = new Person({
        name: body.name,
        country: body.country,
        dna: req.dnaFormated,
        result: req.result
    });

    try {
        await person.save((err, personDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                person: personDB
            });

        });
    } catch (e) {
        console.error(e);
    }


});

app.get('/covid/stats', async(req, res) => {

    try {
        await Person.find()
            .exec((err, persons) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                let counting = countByStatus(persons);

                res.json({
                    ok: true,
                    healthy: counting.healthy,
                    infected: counting.infected,
                    immune: counting.immune
                });

            });
    } catch (e) {
        console.error(e);
    }


});

app.get('/covid/checks/search', queryValidator, async(req, res) => {

    try {
        await Person.find(req.dbObjectParameter)
            .exec((err, persons) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    country: req.dbObjectParameter.country,
                    result: req.dbObjectParameter.result,
                    persons
                });

            });
    } catch (e) {
        console.error(e);
    }


});

app.get('/covid/checks/:id', async(req, res) => {

    let id = req.params.id;

    try {
        await Person.findById(id, (err, person) => {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Person not found.'
                    }
                });
            }

            res.json({
                ok: true,
                person
            });

        });
    } catch (e) {
        console.error(e);
    }

});

module.exports = app;