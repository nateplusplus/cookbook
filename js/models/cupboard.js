Cookbook.Cupboard = DS.Model.extend({
    item: DS.attr('string')
});

Cookbook.Cupboard.FIXTURES = [
    {
        'id'    : 1,
        'item'  : 'test item'
    },
    {
        'id'    : 2,
        'item'  : 'another test item'
    }
];