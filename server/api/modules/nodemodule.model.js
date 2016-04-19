//'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating the fields we'll want to store in our database
var ImageSchema = new Schema({
	label: { type: String },
	img: { data: Buffer, contentType: String },
	timestamp: { type: Date, 'default': Date.now }
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;

