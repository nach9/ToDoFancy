var express = require('express');
var router = express.Router();
const TodoCtrl = require('../controllers/todo')
const checkUser = require('../helpers/checkUser')

router.get('/', checkUser, TodoCtrl.getAll );
router.post('/new', checkUser, TodoCtrl.addNote );
router.delete('/:noteid',  checkUser,TodoCtrl.deleteNote );
router.put('/add/:noteid',  checkUser,TodoCtrl.addTask );
router.put('/delete/:noteid',  checkUser,TodoCtrl.deleteTask );
router.put('/task/:noteid',  checkUser,TodoCtrl.toggleTask );


module.exports = router;
