Cookbook.Router.map(function() {
    this.resource('ingredients', { path: '/' });
    this.route('recipes');
    this.route('directions');
});

/*Cookbook.ApplicationController = Ember.ArrayController.extend({});*/

Cookbook.IngredientsRoute = Ember.Route.extend({
    
    model: function() {
        return Ember.RSVP.hash({
            recipes: this.store.findAll('recipes'),
            directions: this.store.findAll('directions'),
            ingredients: this.store.findAll('ingredients'),
            cupboard: this.store.findAll('cupboard')
        });
    },
    
    setupController: function(controller, model) {
        controller.set('recipes', model.recipes);
        controller.set('directions', model.directions);
        controller.set('ingredients', model.ingredients);
        controller.set('cupboard', model.cupboard);
    }
    
});