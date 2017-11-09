var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/todo');

var todoSchema = new Schema({
  task: String,
  userid: String,
  username:String,
  completed: Boolean,
  reminder:Date,
  created_at: Date,
  completed_at: Date
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
