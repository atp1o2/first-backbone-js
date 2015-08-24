var app = {}

// model for todo
app.Todo = Backbone.Model.extend({
  defaults: {
    title: "",
    completed: false
  }
})

// Collection of todos
app.TodoList = Backbone.Collection.extend({
  model: app.Todo,
  //url: '/todo'  where the models resource would be located on the server
  localStorage: new Store("backbone-todo")
})



// View for Todo
// Four basic properties
// el, intialize, render, events
// view.el
  //every ivew needs to ref a DOM at all times
  //view will inject content into this element
  //cached jQuery obj of the view's element
// initialize
  //pass parameters that will be attached to a model/collection/view
// render
  //injects the markup into the elements
  //now all views require having a render function
// events
  //{"<EVENT_TYPE> <ELEMENT_ID>": "<CALLBACK_FUNTION>"}
  // ex. $('#new-todo').keypress(createTodoOnEnter);
  // ex. todoList.on('add', this.addAll, this);
app.TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// View that takes a collection and renders each item
app.AppView = Backbone.View.extend({
  el: '#todoapp',

  initialize: function(){
    this.input = this.$('#new-todo')
    // when new elements are added to the collection render then with addOne
    app.todoList.on('add', this.addOne, this);
    app.todoList.on('reset', this.addAll, this);
    app.todoList.fetch(); // loads list from local storage
  },

  events: {
    'keypress #new-todo': 'createTodoOnEnter'
  },

  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
      return;
    }
    app.todoList.create(this.newAttributes());
    this.input.val('')
  },

  addOne: function(todo){
    var view = new app.TodoView({model: todo});
    $('#todo-list').append(view.render().el)
  },

  addAll: function(){
    this.$('#todo-list').html(''); // clearn the todo list
    app.todoList.each(this.addOne, this);
  },

  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  }
});





// DRIVER CODE
//model
var todo1 = new app.Todo({title: 'Learn backbone.js'})
var todo2 = new app.Todo({title: 'Implement it into Rails'})
//collection
var todoList = new app.TodoList();
todoList.add(todo1)
todoList.add(todo2)
//view
var view = new app.TodoView({model: app.todo})

app.appView = new app.AppView();
