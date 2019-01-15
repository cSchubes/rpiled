
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rainbowGradient').del()
    .then(function () {
      // Inserts seed entries
      return knex('rainbowGradient').insert([
        {id: 1, time: 50},
      ]);
    });
};
