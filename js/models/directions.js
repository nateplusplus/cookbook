Cookbook.Directions = DS.Model.extend({
    recipeId: DS.attr(),
    step: DS.attr()
});

Cookbook.Directions.FIXTURES = [
    {
        "id": 1,
        "recipeId": 1,  //Foreign Key to Recipes.js
        "step": "Preheat oven to 400 degrees."
    },
    {
        "id": 2,
        "recipeId": 1,
        "step": "Pat chicken dry."
    },
    {
        "id": 3,
        "recipeId": 1,
        "step": "Coat pan with cooking oil of choice."
    },
    {
        "id": 4,
        "recipeId": 1,
        "step": "Arrange chicken on pan."
    },
    {
        "id": 5,
        "recipeId": 1,
        "step": "Cook chicken for 30 minutes to brown the chicken."
    },
    {
        "id": 6,
        "recipeId": 1,
        "step": "Set oven to 350 and continue cooking until juices run clear, or internal temperature is 170 degrees."
    },
    {
        "id": 7,
        "recipeId": 2,
        "step": "Preheat oven to 350 degrees."
    },
    {
        "id": 8,
        "recipeId": 2,
        "step": "Cover pan with aluminum foil"
    },
    {
        "id": 9,
        "recipeId": 2,
        "step": "Coat foil with cooking oil of choice."
    },
    {
        "id": 10,
        "recipeId": 2,
        "step": "Arrange pecans on foil-covered pan."
    },
    {
        "id": 11,
        "recipeId": 2,
        "step": "Toast the pecans, but don't let them burn!"
    },
    {
        "id": 12,
        "recipeId": 2,
        "step": "Cut brussles in half, along the stem."
    },
    {
        "id": 13,
        "recipeId": 2,
        "step": "Take pecans out, let cool for a minute."
    },
    {
        "id": 14,
        "recipeId": 2,
        "step": "Again, coat the pan with cooking oil of choice."
    },
    {
        "id": 15,
        "recipeId": 2,
        "step": "Toss brussles with oil, maple syrup, salt and pepper."
    },
    {
        "id": 16,
        "recipeId": 2,
        "step": "Roast the brussles for 20 minutes or until golden brown in spots."
    },
    {
        "id": 17,
        "recipeId": 2,
        "step": "Transfer to a serving dish, and top with nuts."
    }
];