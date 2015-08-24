(function($){

  // create new instances of Item
  var Item = Backbone.Model.extend({
    defaults: {
      part1: "hello",
      part2: "world"
    }
  });

  // List collection contains Item models
  var List = Backbone.Collection.extend({
    model: Item
  });

  // Backbone View
  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click button#add': 'addItem'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem');
      // instantiates a Collection
      this.collection = new List()
      // collection event binder
      // binds its add event to own method appendItem
      // 'add' is an event listener from bb.js
      // whenever an appendItem is ran, 'add' listens and updates
      this.collection.bind('add', this.appendItem)
      this.counter = 0;
      this.render();
    },

    render: function(){
      var self = this
      $(this.el).append("<button id='add'>Add List</button>")
      $(this.el).append("<ul></ul>")
      _(this.collection.models).each(function(item){
        self.appendItem(item)
      }, this)
    },

    addItem: function(){
      this.counter++
      var item = new Item()
      item.set({ part2: item.get('part2') + this.counter }) //from view initialize
      this.collection.add(item)
    },

    appendItem: function(item){
      $('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>")
    }


  });


  var listView = new ListView()
})(jQuery);
