require('../../config/config');

const expect = require('chai').expect;
const request = require('supertest');
const req = require('request');
const nock = require('nock');

const app = require('../../routes');
const conn = require('../../database');

const {
    dnaIsWholeNumberAfterSqrt,
    dnaBases,
    dnaConverter,
    getDiagnostic,
    countByStatus
} = require('../../utils/utils');

const mocks = require('../mocks');

const url = nock(process.env.URL);
const api = req.defaults({
    baseUrl: process.env.URL
});

describe('UNIT TESTING - getting people', () => {

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

});

describe('UNIT TESTING - getting people by status', () => {

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

    it('OK, getting peoples by status', (done) => {

        url.get('/covid/stats')
            .reply(200, mocks.getStats);

        api.get('/covid/stats', (err, res, body) => {
            let result = JSON.parse(body);
            expect(result).to.deep.equals(mocks.getStats);
            expect(result.healthy).to.deep.equals(6);
            expect(result.infected).to.deep.equals(1);
            expect(result.immune).to.deep.equals(2);
            done();
        });

    });

});

describe('UNIT TESTING - getting people by id', () => {

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

    it('OK, getting people by id', (done) => {

        url.get('/covid/checks/5f02ac3154007ac394f05b93')
            .reply(200, mocks.mockHealthy);

        api.get('/covid/checks/5f02ac3154007ac394f05b93', (err, res, body) => {
            let people = JSON.parse(body);
            expect(people).to.deep.equals(mocks.mockHealthy);
            expect(people.result).to.deep.equals('healthy');
            done();
        });

    });

    it('OK, no people because id not exits', (done) => {

        url.get('/covid/checks/5f02ac3154007ac394f05b93')
            .reply(200, {});

        api.get('/covid/checks/5f02ac3154007ac394f05b93', (err, res, body) => {
            expect(JSON.parse(body)).to.deep.equals({});
            done();
        });

    });

});

describe('UNIT TESTING - getting people by result or country', () => {

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

    it('OK, getting people by country', (done) => {

        url.get('/covid/checks/search?country=Argentina')
            .reply(200, mocks.mockImmune);

        api.get('/covid/checks/search?country=Argentina', (err, res, body) => {
            let people = JSON.parse(body);
            expect(people).to.deep.equals(mocks.mockImmune);
            expect(people.country).to.deep.equals('Argentina');
            done();
        });

    });

    it('OK, getting people by result', (done) => {

        url.get('/covid/checks/search?result=infected')
            .reply(200, mocks.mockInfected);

        api.get('/covid/checks/search?result=infected', (err, res, body) => {
            let people = JSON.parse(body);
            expect(people).to.deep.equals(mocks.mockInfected);
            expect(people.result).to.deep.equals('infected');
            done();
        });

    });

    it('Fail, no parameters send', (done) => {

        const fail = {
            "ok": false,
            "err": {
                "message": "You must insert at least a value for country or result in query."
            }
        }

        url.get('/covid/checks/search?result=infected')
            .reply(400, fail);

        api.get('/covid/checks/search?result=infected', (err, res, body) => {
            expect(JSON.parse(body)).to.deep.equals(fail);
            done();
        });

    });

});

describe('UNIT TESTING - utils', () => {

    it('It should be DNA whole number after Sqrt', (done) => {
        let dnaWhole = dnaIsWholeNumberAfterSqrt("AAAABBBBG");
        expect(dnaWhole).to.be.true;
        done();
    });

    it('It should not be DNA whole number after Sqrt', (done) => {
        let dnaWhole = dnaIsWholeNumberAfterSqrt("AAAABBBB");
        expect(dnaWhole).to.be.false;
        done();
    });

    it('It should be a correct dna', (done) => {
        let dnaCorrect = dnaBases("AAAACCCC");
        expect(dnaCorrect).to.be.true;
        done();
    });

    it('It should be a incorrect dna', (done) => {
        let dnaCorrect = dnaBases("AAAASCCC");
        expect(dnaCorrect).to.be.false;
        done();
    });

    it('It should be a healthy person', (done) => {
        let result = getDiagnostic("ATGCGACGGTACTTATGTAGAAGGCCCCTATCACTG");
        expect(result).to.deep.equals('healthy');
        done();
    });

    it('It should be a infected person', (done) => {
        let result = getDiagnostic("ATGCGACGGTGCTTATGTAGAAGGCCCCTATCACTG");
        expect(result).to.deep.equals('infected');
        done();
    });

    it('It should be a immune person', (done) => {
        let result = getDiagnostic("AAAAGACGGTGCTTATGTAGAAGTCCCCTTTCACTT");
        expect(result).to.deep.equals('immune');
        done();
    });

    it('It should convert dna to arr', (done) => {
        let result = dnaConverter("ATGCGACGGTACTTATGTAGAAGGCCCCTATCACTG");
        let arr = ["ATGCGA", "CGGTAC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
        expect(result).to.deep.equals(arr);
        done();
    });

    it('It should count by status', (done) => {
        let counts = countByStatus(mocks.getChecks.persons);
        expect(counts.healthy).to.deep.equals(1);
        expect(counts.infected).to.deep.equals(1);
        expect(counts.immune).to.deep.equals(1);
        done();
    });

});

describe('UNIT TESTING - posting people', () => {

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

    it('Failed, post people with no string dna', (done) => {
        done();
    });

});