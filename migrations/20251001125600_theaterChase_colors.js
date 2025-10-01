exports.up = function(knex) {
  return knex.schema.alterTable('theaterChase', function (table) {
    // Add the 'color' column, using 'json' to store the array of RGB objects.
    // The data will look like: [{"r": 255, "g": 0, "b": 0}, {"r": 0, "g": 0, "b": 255}]
    table.json('color'); 
    table.integer('iterations');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('theaterChase', function (table) {
    // Drop the new column if rolling back the migration.
    table.dropColumn('color');
    table.dropColumn('iterations');
  });
};
