Cookbook.Cupboard = DS.Model.extend({
    item: DS.attr('string')
});

Cookbook.Cupboard.FIXTURES = [
 {
   id: 1,
   item: 'Chicken'
 },
 {
   id: 2,
   item: 'Ground Beef'
 },
 {
   id: 3,
   item: 'Brussle Sprouts'
 }
];