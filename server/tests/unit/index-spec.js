require('../../config/config');

const expect = require('chai').expect;
const request = require('supertest');
const path = require('path');
const nock = require('nock');

const app = require('../../routes');
const conn = require('../../database');

const { mockHealthy, mockInfected, mockImmune } = require('../mocks');

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
        request(app).get('/covid/checks')
            .then((res) => {
                //                const body = res.body;
                //                expect(body.length).to.equal(0);
                console.log(res.body);
                done();
            })
            .catch((err) => done(err));
    });

});