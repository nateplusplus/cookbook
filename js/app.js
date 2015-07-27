window.Cookbook = Ember.Application.create();



// ============ ROUTERS ============ //

Cookbook.Router.map(function() {
    this.route('ingredients');
    this.route('recipes');
    this.route('directions');
});

Cookbook.IngredientsRoute = Ember.Route.extend({
    
    model: function() {
        return this.store.find('cupboard');
    },
    setupController: function(controller, model){
        this._super(controller, model);
        controller.set('ingredients', this.store.find('Ingredients'));
        controller.set('cupboard', this.store.find('Cupboard'));
    }
    
});


// ============ MODELS ============ //

Cookbook.ApplicationAdapter = DS.FixtureAdapter.extend();

Cookbook.Cupboard = DS.Model.extend({
    item: DS.attr()
});

Cookbook.Ingredients = DS.Model.extend({
    recipeId: DS.attr(),
    food: DS.attr()
});

Cookbook.Cupboard.FIXTURES = [
    {
        'id'    : 1,
        'item'  : 'Chicken'
    },
    {
        'id'    : 2,
        'item'  : 'Brussle Sprouts'
    }
]


Cookbook.Ingredients.FIXTURES = [
    {
            "id": 1,
            "recipeId": 1,  //Foreign Key to Recipes model
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


// ============ VIEWS ============ //


// ============ CONTROLLERS ============ //

