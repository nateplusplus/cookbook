App = Ember.Application.create();

App.Router.map(function () {
    this.route('recipes');
    this.route('directions');
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            ingredients: $.getJSON('js/recipes.json').then(function(data) {

                var x = new Array;

                for (i=0; i<data.recipes.length; i++){
                    for (a=0; a<data.recipes[i].ingredients.length; a++){
                        x.push(data.recipes[i].ingredients[a]);
                    }
                }

                for (i=0; i<x.length; i++){
                    var y = x[i].item;
                    for (a=0; a<x.length; a++){
                        if( a==i){ continue }
                        if( x[i].item == x[a].item ){
                            x.splice([a],1);
                        }
                    }
                }

                function compare(a,b) {
                  if (a.item < b.item)
                    return -1;
                  if (a.item > b.item)
                    return 1;
                  return 0;
                }

                x.sort(compare);

                return x;
            }), // Ingredients Object
            cupboard: []
    
        });     // RSVP hash
    }       // Model function
});     // Index Route

App.IndexController = Ember.Controller.extend({
    actions: {
        select: function( clicked ){
            this.set('item', clicked);
        }
    }
});


App.RecipesRoute = Ember.Route.extend({
    model: function() {
        return $.getJSON('js/recipes.json').then(function(data) {
            return data.recipes;
        });
    }
});

App.DirectionsRoute = Ember.Route.extend({
    model: function() {
        return $.getJSON('js/recipes.json').then(function(data) {
            return data.recipes;
        });
    }
});