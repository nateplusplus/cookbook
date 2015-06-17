App = Ember.Application.create();

App.Router.map(function () {
    this.route('recipes');
    this.route('directions');
});

App.RecipesRoute = Ember.Route.extend({
    model: function() {
        return $.getJSON('js/recipes.json').then(function(data) {
            return data.recipes;
        });
    }
});

App.DirectionsRoute = Ember.Route.extend({
    model: function() {
        return $.getJSON('js/recipes.json').then(function(data) {
            return data.recipes;
        });
    }
});