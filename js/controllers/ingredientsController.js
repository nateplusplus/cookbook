Cookbook.IngredientsController = Ember.ArrayController.extend({
    otherIngredients: function() {
        var cupboardItems = this.get('cupboard').getEach('item');
        
        // Find instances of cupboard items within ingredients model
        var firstRecipe = this.store.find('ingredients', {food: 'Baked Chicken'});
        console.log(firstRecipe);
        
        
            // Finding matching records
            //  http://guides.emberjs.com/v1.10.0/models/finding-records/
        
            // Change model to actual network request instead of fixture - will solve a lot
            // http://stackoverflow.com/questions/16753150/unable-to-query-emberjs-model-when-using-ds-fixtureadapter
        
        
        // Find matching recipeId for each
        // Get ingredients corresponding to each recipeId
        // Subtract any ingredients already listed in cupboard
        // Print result as array
        
        return cupboardItems;
    }.property()    // Not updating either due to dependencies, or use of fixtures
});