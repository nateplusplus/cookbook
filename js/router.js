Cookbook.Router.map(function() {
    this.resource('ingredients', { path: '/' } );
    this.route('recipes');
    this.route('directions');
});

Cookbook.IngredientsRoute = Ember.Route.extend({
     model: function() {
        return Ember.RSVP.hash({
            recipes: this.store.find('recipes'),
            cupboard: this.store.find('cupboard')
        })
    }
});

