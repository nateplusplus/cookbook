Cookbook.Router.map(function() {
    this.resource('ingredients', { path: '/' });
    this.route('recipes');
    this.route('directions');
});

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
    },
    
    actions: {
        addToCupboard: function(data) {
            var newFood = this.store.createRecord('cupboard', {
                item: data
            });
            newFood.save();
        }
    }
    
});

Cookbook.IngredientsView = Ember.View.extend({
    templateName: 'ingredients'
});

Cookbook.SelectFoodView = Ember.View.extend({
  click: function(evt) {
      var selectedFood = this.$().text();
      this.get('controller').send('addToCupboard', selectedFood);
  }
});

Cookbook.Item = Ember.Object.extend();