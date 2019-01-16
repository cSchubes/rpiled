
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Templates').del()
    .then(function () {
      // Inserts seed entries
      return knex('Templates').insert([
        {
          name: 'rainbowGradient',
          subtitle: 'Rainbow across the strip.',
          icon: 'gradient'
        },
        {
          name: 'rainbowStrip',
          subtitle: 'Rainbow with the entire strip.',
          icon: 'looks'
        },
        {
          name: 'strandTest',
          subtitle: 'Cycle of testing animations.',
          icon:'mdi-test-tube'
        },
        {
          name: 'theaterChase',
          subtitle: 'Theater style lights.',
          icon: 'mdi-filmstrip'
        }
      ]);
    });
};
