Cookbook.Ingredients = DS.Model.extend({
    recipeId: DS.attr(),
    food: DS.attr()
});

Cookbook.Ingredients.FIXTURES = [
    {
        "id": 1,
        "recipeId": 1,  //Foreign Key to Recipes.js
        "food": "Chicken"
    },
    { 
        "id": 2,
        "recipeId": [1, 2],
        "food": "Cooking Oil"
    },
    { 
        "id": 3,
        "recipeId": [1, 2],
        "food": "Salt"
    },
    { 
        "id": 4,
        "recipeId": [1, 2],
        "food": "Black Pepper"
    },
    { 
        "id": 5,
        "recipeId": 2,
        "food": "Brussle Sprouts"
    },
    { 
        "id": 6,
        "recipeId": 2,
        "food": "Garlic"
    },
    { 
        "id": 7,
        "recipeId": 2,
        "food": "Pecans"
    },
    { 
        "id": 8,
        "recipeId": 2,
        "food": "Maple Syrup"
    }
];