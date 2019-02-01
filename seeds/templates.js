
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
        },
        {
          name: 'meteor',
          subtitle: 'Meteors streak across the strip.',
          icon: 'mdi-meteor',
          defaults: JSON.stringify({
            time: 20,
            color: 13107455, // purple (200, 0, 255) in RGB
            meteors: 5,
            size: 10
          })
        },
        {
          name: 'strobe',
          subtitle: 'Seizure Warning.',
          icon: 'mdi-flashlight',
          defaults: JSON.stringify({
            time: 30,
            color: 16777215,
            brightness: 150,
          })
        }
      ]);
    });
};
