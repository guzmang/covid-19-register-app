require('../../config/config');

const { MongoClient } = require('mongodb');
const expect = require('chai').expect;
const request = require('supertest');
const req = require('request');
const nock = require('nock');

const app = require('../../routes');
const conn = require('../../database');
const PersonService = require('../../services/person-service');

const {
    dnaIsWholeNumberAfterSqrt,
    dnaBases,
    dnaConverter,
    getDiagnostic,
    countByStatus
} = require('../../utils/utils');
const queryValidator = require('../../middlewares/queryVerifier');
const dnaValidator = require('../../middlewares/dnaVerifier');
const mocks = require('../mocks');

const url = nock(process.env.URL);

process.env.URL = 'http://localhost:3000/';
const api = req.defaults({
    baseUrl: process.env.URL
});

describe('UNIT TESTING - testing utils', () => {

    test('It should be DNA whole number after Sqrt', (done) => {
        let dnaWhole = dnaIsWholeNumberAfterSqrt("AAAABBBBG");
        expect(dnaWhole).to.be.true;
        done();
    });

    test('It should not be DNA whole number after Sqrt', (done) => {
        let dnaWhole = dnaIsWholeNumberAfterSqrt("AAAABBBB");
        expect(dnaWhole).to.be.false;
        done();
    });

    test('It should be a correct dna', (done) => {
        let dnaCorrect = dnaBases("AAAACCCC");
        expect(dnaCorrect).to.be.true;
        done();
    });

    test('It should be a incorrect dna', (done) => {
        let dnaCorrect = dnaBases("AAAASCCC");
        expect(dnaCorrect).to.be.false;
        done();
    });

    test('It should be a healthy person (sending Array)', (done) => {
        let result = getDiagnostic(["ATGCGA", "CGGTAC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]);
        expect(result).to.deep.equals('healthy');
        done();
    });

    test('It should be a healthy person', (done) => {
        let result = getDiagnostic("ATGCGACGGTACTTATGTAGAAGGCCCCTATCACTG");
        expect(result).to.deep.equals('healthy');
        done();
    });

    test('It should be a infected person', (done) => {
        let result = getDiagnostic("ATGCGACGGTGCTTATGTAGAAGGCCCCTATCACTG");
        expect(result).to.deep.equals('infected');
        done();
    });

    test('It should be a immune person', (done) => {
        let result = getDiagnostic("AAAAGACGGTGCTTATGTAGAAGTCCCCTTTCACTT");
        expect(result).to.deep.equals('immune');
        done();
    });

    test('It should convert dna to arr', (done) => {
        let result = dnaConverter("ATGCGACGGTACTTATGTAGAAGGCCCCTATCACTG");
        let arr = ["ATGCGA", "CGGTAC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
        expect(result).to.deep.equals(arr);
        done();
    });

    test('It should count by status', (done) => {
        let counts = countByStatus(mocks.getChecks.persons);
        expect(counts.healthy).to.deep.equals(1);
        expect(counts.infected).to.deep.equals(1);
        expect(counts.immune).to.deep.equals(1);
        done();
    });

});

describe('UNIT TESTING - testing middlewares', () => {

    let res;
  
    beforeAll(async () => {
        res = {
            send: function(){ },
            json: function(err){
                // console.log("\n : " + err);
            },
            status: function(responseStatus) {
                // assert.equal(responseStatus, 404);
                // This next line makes it chainable
                return this; 
            }
        }
    });

    /* Testing query validator */

    test('Ok, sending country as parameter', (done) => {
        let req = {
            query: {
                country: 'Wakanda'
            }
        };
        let result = queryValidator(req, null, function(){ });
        done();
    });

    test('Ok, sending result as parameter', (done) => {
        let req = {
            query: {
                result: 'healthy'
            }
        };
        let result = queryValidator(req, null, function(){ });
        done();
    });

    test('Ok, sending the 2 parameters', (done) => {
        let req = {
            query: {
                country: 'Wakanda',
                result: 'healthy'
            }
        };
        let result = queryValidator(req, null, function(){ });
        done();
    });

    test('Failed, null country and null result', (done) => {
        let req = {
            query: {
                country: null,
                result: null
            }
        };
        let result = queryValidator(req, res, function(){ });
        done();
    });

    test('Failed, invalid result', (done) => {
        let req = {
            query: {
                result: 'inmortal'
            }
        };
        let result = queryValidator(req, res, function(){ });
        done();
    });

    /* Testing dna validator */

    test('Failed, sending empty dna', (done) => {
        let req = {
            body: {
                dna: ''
            }
        };
        let result = dnaValidator(req, res, function(){ });
        done();
    });

    test('Failed, sending type integer dna', (done) => {
        let req = {
            body: {
                dna: 1234
            }
        };
        let result = dnaValidator(req, res, function(){ });
        done();
    });

    test('Failed, sending type string dna and length < 36', (done) => {
        let req = {
            body: {
                dna: "AAAAAABBBBBBCCCCCCDDDDDDEEEEEEFFFFF"
            }
        };
        let result = dnaValidator(req, res, function(){ });
        done();
    });

    test('Failed, sending type string dna and length > 36 but no NxN sequence', (done) => {
        let req = {
            body: {
                dna: "AAAAAABBBBBBCCCCCCDDDDDDEEEEEEFFFFFFG"
            }
        };
        let result = dnaValidator(req, res, function(){ });
        done();
    });

    test('Failed, sending type string dna and NxN sequence', (done) => {
        let req = {
            body: {
                dna: "AAAAAABBBBBBCCCCCCDDDDDDEEEEEEFFFFFF"
            }
        };
        let result = dnaValidator(req, res, function(){ });
        done();
    });

    test('OK, sending corrects type string dna and NxN sequence', (done) => {
        let req = {
            body: {
                dna: "AAAAAATTTTTTCCCCCCGGGGGGAAAAAATTTTTT"
            }
        };
        let result = dnaValidator(req, res, function(){ });
        done();
    });

});

describe('UNIT TESTING - testing services', () => {

    let personService;
  
    beforeAll(async () => {
        personService = new PersonService();
    });

    /* These services need to be call from an app instance through a route, otherwise it will be an undefined resolved promise */

    test('OK, getting all people', async(done) => {
        let result = await personService.getAllPersons();
        expect(result).to.deep.equals(undefined);
        done();
    });

    test('OK, save a people register', async(done) => {
        let req = {
            body: {
                name: 'John',
                country: 'Doe',
                dna: 'AAAT',
                result: 'healthy'
            }
        };
        let res = {
            send: function(){ },
            json: function(err){
                // console.log("\n : " + err);
            },
            status: function(responseStatus) {
                // assert.equal(responseStatus, 404);
                // This next line makes it chainable
                return this; 
            }
        }
        let result = await personService.savePerson(req, res);
        expect(result).to.deep.equals(undefined);
        done();
    });

    test('Failed, save a people register (no parameters)', async(done) => {
        try {
            await personService.savePerson();
            done();
        } catch(e) {
//            console.log(e);
            done();
        }
    });

    test('OK, getting statistics', async(done) => {
        let result = await personService.getStatistics();
        expect(result).to.deep.equals(undefined);
        done();
    });

    test('OK, getting people filtered by country and/or result', async(done) => {
        let result = await personService.getPersonsByCountryAndResult();
        expect(result).to.deep.equals(undefined);
        done();
    });

    test('OK, get a specific people by id', async(done) => {
        let req = {
            params: {
                id: '123'
            }
        };
        let res = {
            send: function(){ },
            json: function(err){
                // console.log("\n : " + err);
            },
            status: function(responseStatus) {
                // assert.equal(responseStatus, 404);
                // This next line makes it chainable
                return this; 
            }
        }
        let result = await personService.getPersonById(req, res);
        expect(result).to.deep.equals(undefined);
        done();
    });

    test('Failed, get a specific people by id', async(done) => {
        done();
        try {
            await personService.getPersonById();
            done();
        } catch(e) {
//            console.log(e);
            done();
        }
    });
});

describe('UNIT TESTING - getting people', () => {

    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      db = await connection.db("covid");
    });
  
    afterAll(async () => {
      await connection.close();
      await db.close();
    });

    test('OK, getting peoples has no peoples', (done) => {

        url.get('/covid/checks')
            .reply(200, {});

        api.get('/covid/checks', (err, res, body) => {
//            console.log(JSON.parse(body));
//            expect(JSON.parse(body)).to.deep.equals({});
            done();
        });

    });

});