
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Animations').del()
    .then(function () {
      // Inserts seed entries
      return knex('Animations').insert([
        {id: 1, name: 'My First Animation', template: 'rainbowGradient', favorite: false},
      ]);
    });
};
