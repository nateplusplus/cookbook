Cookbook.Recipes = DS.Model.extend({
    recipeName: DS.attr(),
    directions: DS.attr(),
    image: DS.attr()
});

Cookbook.Recipes.FIXTURES = [
 {
      "id": 1,  // Primary Key
      "recipeName": "Baked Chicken",
      "image": "../img/baked-chicken.jpg"
    },
    {
      "id": 2,
      "recipeName": "Pecan Roasted Brussles",
      "image": ""
    }
];