var person = {
  name: "Jon Doe"
}


var module = {
  name: "Andrew",

  getName: function(){
    return this.name;
  }
}



var original = module.getName()
// returns "Andrew"

person.getName = module.getName.bind(person)
//takes the getName method from module
// wo the bind, getName() would return "Andrew"
// binding it to person sets 'this' to person object
person.getName()
// returns 'Jon Doe' bc we have binded it



