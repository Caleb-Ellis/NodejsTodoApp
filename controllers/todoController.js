var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds051720.mlab.com:51720/todo');

//create schema (blueprint)
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/todo', function(req, res){
  //get data from mongoDB and pass it to view
  Todo.find({}, function(err, data) {
    if (err) throw err;
    res.render('todo', {todos: data});
  });
});

app.post('/todo', urlencodedParser, function(req, res){
  //get data from view and add to mongoDB
  var newTodo = Todo(req.body).save(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', function(req, res){
  //delete the requested item from mongoDB
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

};
