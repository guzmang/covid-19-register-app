require('../../config/config');

const expect = require('chai').expect;
const request = require('supertest');
const req = require('request');
const nock = require('nock');

const app = require('../../routes');
const conn = require('../../database');

const mocks = require('../mocks');

const url = nock(process.env.URL);
const api = req.defaults({
    baseUrl: process.env.URL
});

describe('UNIT TESTING - COVID-19', () => {

    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })

    it('OK, getting peoples has no peoples', (done) => {

        url.get('/covid/checks')
            .reply(200, {});

        api.get('/covid/checks', (err, res, body) => {
            expect(JSON.parse(body)).to.deep.equals({});
            done();
        });

    });

    it('OK, getting peoples has one people and healthy', (done) => {

        url.get('/covid/checks')
            .reply(200, mocks.mockHealthy);

        api.get('/covid/checks', (err, res, body) => {
            let people = JSON.parse(body);
            expect(people).to.deep.equals(mocks.mockHealthy);
            expect(people.result).to.deep.equals('healthy');
            done();
        });

    });

    it('OK, getting peoples has one people and infected', (done) => {

        url.get('/covid/checks')
            .reply(200, mocks.mockInfected);

        api.get('/covid/checks', (err, res, body) => {
            let people = JSON.parse(body);
            expect(people).to.deep.equals(mocks.mockInfected);
            expect(people.result).to.deep.equals('infected');
            done();
        });

    });

    it('OK, getting peoples has one people and immune', (done) => {

        url.get('/covid/checks')
            .reply(200, mocks.mockImmune);

        api.get('/covid/checks', (err, res, body) => {
            let people = JSON.parse(body);
            expect(people).to.deep.equals(mocks.mockImmune);
            expect(people.result).to.deep.equals('immune');
            done();
        });

    });

    it('OK, getting peoples has all people', (done) => {

        url.get('/covid/checks')
            .reply(200, mocks.getChecks);

        api.get('/covid/checks', (err, res, body) => {
            let people = JSON.parse(body).persons;
            expect(people).to.deep.equals(mocks.getChecks.persons);
            expect(people).to.have.lengthOf(mocks.getChecks.persons.length);
            done();
        });

    });

    it('Failed, post people with no string dna', (done) => {
        done();
    });

});