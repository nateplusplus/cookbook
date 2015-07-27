window.Cookbook = Ember.Application.create();



// ============ ROUTERS ============ //

Cookbook.Router.map(function() {
    this.route('recipes');
    this.route('directions', { path: 'directions/:id' });
});



/* Ingredients route */ 

Cookbook.IndexRoute = Ember.Route.extend({
    
    model: function() {
        return Ember.RSVP.hash({
            ingredients: this.store.findAll('ingredients'),
            cupboard: this.store.findAll('cupboard'),
            removedFoods: this.store.findAll('removedFoods'),
            recipes: this.store.findAll('recipes')
        });
    },
    actions: {
        addToCupboard: function(data) {
            var newFood = this.store.createRecord('cupboard', {
                item: data
            });
            newFood.save();
        },
        removeFromCupboard: function(data) {
            var entry = 'No '+data,
                newFood = this.store.createRecord('removedFoods', {
                item: entry
            });
            newFood.save();
        },
        deselect: function(data) {
           this.store.find(data).then( function(record) {
               record.destroyRecord();
           });
        }
    }
    
});


/* Recipes route */ 

Cookbook.RecipesRoute = Ember.Route.extend({
    
    model: function() {
        return Ember.RSVP.hash({
            ingredients: this.store.findAll('ingredients'),
            cupboard: this.store.findAll('cupboard'),
            removedFoods: this.store.findAll('removedFoods'),
            recipes: this.store.findAll('recipes')
        });
    }
});


/* Directions route */ 
/*
Cookbook.DirectionsRoute = Ember.Route.extend({
    
    model: function() {
        return Ember.RSVP.hash({
            ingredients: this.store.findAll('ingredients'),
            cupboard: this.store.findAll('cupboard'),
            removedFoods: this.store.findAll('removedFoods'),
            recipes: this.store.findAll('recipes'),
            directions: this.store.findAll('step')
        });
    }
});*/



// ============ VIEWS ============ //

Cookbook.CupboardView = Ember.View.extend({
  click: function(evt) {
      var cupboardItem = this.$().text();
      this.get('controller').send('deselect', cupboardItem);
  }
});

Cookbook.SelectFoodView = Ember.View.extend({
  click: function(evt) {
      var selectedFood = this.$().text();
      this.get('controller').send('addToCupboard', selectedFood);
  }
});

Cookbook.RemoveFoodView = Ember.View.extend({
  click: function(evt) {
      var removeFood = this.$().text();
      this.get('controller').send('removeFromCupboard', removeFood);
  }
});


// ============ CONTROLLERS ============ //




// ============ MODELS ============ //

Cookbook.ApplicationAdapter = DS.FixtureAdapter.extend();

Cookbook.Cupboard = DS.Model.extend({
    item: DS.attr()
});

Cookbook.RemovedFoods = DS.Model.extend({
    item: DS.attr()
});

Cookbook.Ingredients = DS.Model.extend({
    recipeId: DS.attr(),
    food: DS.attr()
});

Cookbook.Recipes = DS.Model.extend({
    recipeName: DS.attr(),
    directions: DS.hasMany('steps', {async: true}),
    image: DS.attr()
});

Cookbook.Step = DS.Model.extend({
    recipeId: DS.belongsTo('recipes'),
    text: DS.attr()
});

Cookbook.Cupboard.FIXTURES = []

Cookbook.RemovedFoods.FIXTURES = []


Cookbook.Ingredients.FIXTURES = [
    {
            "id": 1,
            "recipeId": 1,  //Foreign Key to Recipes
            "food": "Chicken"
        }, { 
            "id": 2,
            "recipeId": [1, 2],
            "food": "Cooking Oil"
        }, { 
            "id": 3,
            "recipeId": [1, 2],
            "food": "Salt"
        }, { 
            "id": 4,
            "recipeId": [1, 2],
            "food": "Black Pepper"
        }, { 
            "id": 5,
            "recipeId": 2,
            "food": "Brussle Sprouts"
        }, { 
            "id": 6,
            "recipeId": 2,
            "food": "Garlic"
        }, { 
            "id": 7,
            "recipeId": 2,
            "food": "Pecans"
        }, { 
            "id": 8,
            "recipeId": 2,
            "food": "Maple Syrup"
        }
]

Cookbook.Recipes.FIXTURES = [
    {
        'id': 1,
        'recipeName': 'Baked Chicken',
        'directions': [1, 2, 3, 4, 5, 6], // Foreign key to Directions
        'image': '../img/baked-chicken.jpg'
    },
    {
        'id': 2,
        'recipeName': 'Pecan Roasted Brussles',
        'directions': [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        'image': ''
    }
]