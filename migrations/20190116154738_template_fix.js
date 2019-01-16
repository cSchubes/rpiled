
exports.up = function(knex, Promise) {
  return knex.schema.table('Templates', function (table){
    table.string('subtitle')
    table.string('icon')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Templates', function (table) {
    table.dropColumn('subtitle');
    table.dropColumn('icon');
  })
};
