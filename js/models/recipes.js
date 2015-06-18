Cookbook.Recipes = DS.Model.extend({
    recipeName: DS.attr('string'),
    ingredients: DS.attr('array'),
    item: DS.attr('string'),
    directions: DS.attr('array'),
    image: DS.attr('image')
});

Cookbook.Recipes.FIXTURES = [
 {
      "id": 1,
      "recipeName": "Baked Chicken",
      "ingredients": [
          { "item": "Chicken" },
          { "item": "Cooking Oil" },
          { "item": "Salt"},
          { "item": "Black Pepper" }
      ],
      "directions": [
          { "step": "Preheat oven to 400 degrees." }, 
          { "step": "Pat chicken dry." },
          { "step": "Cover all sides with salt and pepper." },
          { "step": "Coat pan with cooking oil of choice." },
          { "step": "Arrange chicken on pan." },
          { "step": "Cook chicken for 30 minutes to brown the chicken." },
          { "step": "Set oven to 350 and continue cooking until juices run clear, or internal temperature is 170 degrees." }
           ],
      "image": "../img/baked-chicken.jpg"
    },
    {
      "id": 2,
      "recipeName": "Pecan Roasted Brussles",
      "ingredients": [
          { "item": "Brussle Sprouts" },
          { "item": "Cooking Oil" },
          { "item": "Salt"},
          { "item": "Black Pepper" },
          { "item": "Garlic" },
          { "item": "Pecans"},
          { "item": "Maple Syrup"}
      ],
      "directions": [
          { "step": "Preheat oven to 350 degrees." },
          { "step": "Cover pan with aluminum foil" },
          { "step": "Coat foil with cooking oil of choice." },
          { "step": "Arrange pecans on foil-covered pan" },
          { "step": "Toast the pecans, but don't let them burn!" },
          { "step": "Cut brussles in half, along the stem." },
          { "step": "Take pecans out, let cool for a minute." },
          { "step": "Again, coat the pan with cooking oil of choice." },
          { "step": "Toss brussles with oil, maple syrup, salt and pepper" },
          { "step": "Roast the brussles for 20 minutes or until golden brown in spots" },
          { "step": "Transfer to a serving dish, and top with nuts" }
      ],
      "image": ""
    }
];