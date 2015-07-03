window.Cookbook = Ember.Application.create();

Cookbook.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'cookbook-emberjs'
});

App.ColorsAdapter = DS.RESTAdapter.extend({
  namespace: 'js/models'
});