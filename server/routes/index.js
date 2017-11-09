var express = require('express');
var router = express.Router();
const FacebookCtrl = require('../controllers/facebook')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({msg:'ok'})
  // res.render('index', { title: 'Express' });
});


router.post('/login', FacebookCtrl.login )

module.exports = router;
