var express = require('express');
var router = express.Router();
const FacebookCtrl = require('../controllers/facebook')


/* GET users listing. */

router.post('/login' , FacebookCtrl.login)

module.exports = router;
