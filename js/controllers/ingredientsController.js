Cookbook.IngredientsController = Ember.ArrayController.extend({
    actions: {
        selectYes: function() {
            console.log('clicked yes');
        },        
        selectNo: function() {
            console.log('clicked no');
        }
    }
});