Cookbook.IngredientsController = Ember.ArrayController.extend({
    otherIngredients: function() {
        var cupboardItems = this.get('cupboard').getEach('item');
        
        // Find instances of cupboard items within ingredients model
        // Find matching recipeId for each
        // Get ingredients corresponding to each recipeId
        // Subtract any ingredients already listed in cupboard
        // Print result as array
        
        return cupboardItems;
    }.property()    // Not updating either due to dependencies, or use of fixtures
});