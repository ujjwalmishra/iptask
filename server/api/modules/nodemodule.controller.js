var mongoose = require('mongoose');
var Image = require('./nodemodule.model');
var fs = require('fs');
var path = require('path');
var base64encoder = require('base64-arraybuffer');

module.exports = {
  index: function (req, res, next) {
    console.log("index called");
    next();
 },
 create: function(req, res, next) {
            var mimetype = req.file.mimetype ;
          if (mimetype === 'image/png' || mimetype === 'image/jpg' || mimetype === 'image/jpeg' || mimetype === 'image/gif') {
              var newImg = new Image();  
              newImg.label = req.body.label;            
              newImg.img.data = req.file.buffer;
              newImg.img.contentType = mimetype;
              newImg.save(function(err, image) {
                if(err) console.log(err);
                console.log('Successfully inserted image: ' + image.filename);
                res.json(200, {message : "Image Uploaded"});
              });
              } else {
                res.json(500, {error: 'Only image files are allowed.'});
               }
  },
getAll: function(req, res, next){
    console.log("findign images");
    console.log("query stuff " + req.query.limit);
    var n = req.query.limit;
    Image.findOne().sort({created_at: 1}).limit(1).skip(n).exec().then(function(image){
      var imageObj = {};
      imageObj.label = image.label;
      imageObj.img = base64encoder.encode(image.img.data);
      res.send(imageObj);
    })
  },
getCount: function(req, res, next){
  console.log('counting');
    Image.count({}, function(err, count){
      if(err) res.send(err);
      res.json(200, {count: count});
    })
  }   
}

