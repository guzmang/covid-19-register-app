const mongoose = require('mongoose');

function connect() {
    console.log("process.env.URLDB");
    console.log("process.env.NODE_ENV");
    console.log(process.env.URLDB);
    console.log(process.env.NODE_ENV);
    return mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        (err, res) => {
            if (err)
                throw err;
            console.log('Base de datos ONLINE');
        });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };