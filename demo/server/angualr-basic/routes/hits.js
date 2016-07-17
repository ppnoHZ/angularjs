var express = require('express');
var router = express.Router();

var hits = 0;
/* GET home page. */
router.get('/hit', function (req, res, next) {
  res.send(200, { hits: hits });
});

router.post('/register', function (req, res, next) {
  hits += 1;
  res.send(200, { hits: hits });
});

module.exports = router;
