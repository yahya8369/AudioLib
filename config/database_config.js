const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const URL = process.env.DATABASE_URL

// Connecting to the database
exports.connect = ()=> {
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

    