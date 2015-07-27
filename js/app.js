window.Cookbook = Ember.Application.create();



// ============ ROUTERS ============ //

Cookbook.Router.map(function() {
    this.resource('ingredients', { path: '/' });
    this.route('recipes');
    this.route('directions');
});

Cookbook.IngredientsRoute = Ember.Route.extend({
    
    // Setup models for recipes, ingredients and cupboard
    model: function() {
        return Ember.RSVP.hash({
            cupboard: this.store.findAll('cupboard'),
            directions: $.getJSON('js/models/directions.json').then(function(data) {
                return data.directions; }),
            ingredients: $.getJSON('js/models/ingredients.json').then(function(data) {
                return data.ingredients; }),
            recipes: $.getJSON('js/models/recipes.json').then(function(data) {
                return data.recipes; }),
        });
    },
    
    // Setup the ingredients controller
    setupController: function(controller, model) {
        controller.set('recipes', model.recipes);
        controller.set('directions', model.directions);
        controller.set('ingredients', model.ingredients);
        controller.set('cupboard', model.cupboard);
    },
    
    // Action allows user to add items to their cupboard
    actions: {
        addToCupboard: function(data) {
            var newFood = this.store.createRecord('cupboard', {
                item: data
            });
            newFood.save();
        }
    }
    
});



// ============ MODELS ============ //

Cookbook.Cupboard = DS.Model.extend({
    item: DS.attr()
});

Cookbook.Directions = DS.Model.extend({
    recipeId: DS.attr(),
    step: DS.attr()
});

Cookbook.Ingredients = DS.Model.extend({
    recipeId: DS.attr(),
    food: DS.attr()
});

Cookbook.Recipes = DS.Model.extend({
    recipeName: DS.attr(),
    directions: DS.attr(),
    image: DS.attr()
});



// ============ VIEWS ============ //

Cookbook.IngredientsView = Ember.View.extend({
    templateName: 'ingredients'
});

Cookbook.SelectFoodView = Ember.View.extend({
  click: function(evt) {
      var selectedFood = this.$().text();
      this.get('controller').send('addToCupboard', selectedFood);
  }
});



// ============ CONTROLLERS ============ //

Cookbook.IngredientController = Ember.ObjectController.extend({
    actions: {
        addToCupboard: function(data) {
        }
    }
});

Cookbook.IngredientsController = Ember.ArrayController.extend({
    otherIngredients: function() {
        var cupboardItems = this.get('cupboard').getEach('item');
        
        // Find instances of cupboard items within ingredients model
        /*var firstRecipe = this.store.find('ingredients', {food: 'Baked Chicken'});
        console.log(firstRecipe);*/
        
        
            // Finding matching records
            //  http://guides.emberjs.com/v1.10.0/models/finding-records/
        
            
        // Find matching recipeId for each
        // Get ingredients corresponding to each recipeId
        // Subtract any ingredients already listed in cupboard
        // Print result as array
        
        return cupboardItems;
    }.property()    // Not updating either due to dependencies, or use of fixtures
});