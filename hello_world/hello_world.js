(function($){

  var ListView = Backbone.View.extend({
    // attaches 'this.el' to an existing element
    el: $("#target"),

    // this initialize method will call on render()
    // causing this view to be 'self-rendering'
    // bindAll will bind this entire object to 'this'
    // useful bc 'this' can change when moving scopes
    // _.bindAll(object, *methodNames)
    // _.bind(function, object, *arguments)
    initialize: function(){
      _.bindAll(this, 'render')
      this.render();
    },

    // function in charge of rendering the entire view
    render: function(){
      $(this.el).append("<ul> <li>Hello, Me</li> </ul>");
    }
  });

  var listView = new ListView();
})(jQuery);
