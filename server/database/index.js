const mongoose = require('mongoose');

function connect() {
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