// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Environmet
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Database and Endpoint
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/covid';
    process.env.URL = 'http://localhost:3000/';
} else {
    urlDB = process.env.MONGO_URI;
    process.env.URL = 'https://covid-19-register.herokuapp.com/';
}
process.env.URLDB = urlDB;