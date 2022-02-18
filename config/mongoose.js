var mongoose = require('mongoose');
var config = require('./config.js');           //Introduce the configuration file under the config configuration folder
module.exports = function () {
    mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });   //Create database connection object db
    //Create a mongoose instance object
    const db = mongoose.connection;
    //connection exception
    db.on('error', (err) => {
        // console.error.bind( 'connection error：')
        console.log('MongoDBConnection failed！！')
    })
    //connection succeeded
    db.once('open', (callback) => {
        console.log('MongoDBconnection succeeded！！')
    })
    //Disconnect
    db.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });
    return db;
}