
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Templates').del()
    .then(function () {
      // Inserts seed entries
      return knex('Templates').insert([
        {name: 'rainbowGradient'},
        {name: 'rainbowStrip'},
        {name: 'theaterChase'}
      ]);
    });
};
