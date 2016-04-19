var router = require('express').Router();

var controller = require('./nodemodule.controller.js');

module.exports = router;

router.get('/images', controller.getAll);
router.get('/images/count', controller.getCount);

router.get('/', controller.index);

router.post('/image', controller.create);


