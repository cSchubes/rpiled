
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Colors').del()
    .then(function () {
      // Inserts seed entries
      return knex('Colors').insert([
        {id: 1, r: 0, g: 0, b: 0, favorite: 1, hex: '#000000'}
      ]);
    });
};
