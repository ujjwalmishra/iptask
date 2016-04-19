var Promise = require('bluebird');
var chalk = require('chalk');
var dbName = "meaniscule-app";

var DATABASE_URI = "mongodb://localhost:27017/" + dbName;

if (process.env.NODE_ENV == 'production'){
	DATABASE_URI = "mongodb://admin:black123@ds015750.mlab.com:15750/lrtask";
}

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});


console.log('Starting MongoDB...');

startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened! dbName:'), chalk.magenta(dbName));
});


module.exports = startDbPromise;
