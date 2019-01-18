
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Templates').del()
    .then(function () {
      // Inserts seed entries
      return knex('Templates').insert([
        {
          name: 'rainbowGradient',
          subtitle: 'Rainbow across the strip.',
          icon: 'gradient',
          defaults: JSON.stringify({
            time: 20,
          })
        },
        {
          name: 'rainbowStrip',
          subtitle: 'Rainbow with the entire strip.',
          icon: 'looks',
          defaults: JSON.stringify({
            time: 20,
          })
        },
        {
          name: 'strandTest',
          subtitle: 'Cycle of testing animations.',
          icon:'mdi-test-tube',
          defaults: JSON.stringify({
            
          })
        },
        {
          name: 'theaterChase',
          subtitle: 'Theater style lights.',
          icon: 'mdi-filmstrip',
          defaults: JSON.stringify({
            time: 50,
          })
        }
      ]);
    });
};
