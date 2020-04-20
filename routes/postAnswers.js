const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('answers are' + req.body.answers);
    res.send('post answers works');
});

module.exports = router;