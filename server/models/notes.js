var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/todo');

var todoSchema = new Schema({
  header:String,
  userid: String,
  username:String,
  reminder:Date,
  createdAt: Date,
  completed:Boolean,
  list:[{
    task: String,
    detail:String,
    inputAt:Date,
    completed: Boolean
  }]

});

var Note = mongoose.model('Note', todoSchema);

module.exports = Note;
