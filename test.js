var knexfile = require('./knexfile');
console.log(knexfile);
const knex = require('knex')(knexfile.development);
// instead of require('knex')(knexfile[enviornment])

// add first base name

// knex.insert({ name: 'rainbowGradient' }).into('bases').then(() => {});

// knex.select().table('bases').then((val) => {
//   console.log(val);
//   knex.destroy();
// }).catch((err) => { console.log(err) })

async function main() {
  // await knex.insert({ 
  //   name: 'Test Animation',
  //   base: 'rainbowGradient',
  //   favorite: false })
  //     .into('animations');
      
  // let items = await knex.select().table('animations');
  // console.log(items);
  // let id = items[0].id;
      
  // await knex.insert({ 
  //   id,
  //   time: 50 })
  //     .into('rainbowGradient');
      
  // let test = await knex.select().table('rainbowGradient');
  // console.log(test);
  
  // let items = await knex.from('animations').innerJoin('rainbowGradient', 'animations.id', 'rainbowGradient.id');
  // console.log(items);

  let items = await knex.select().table('Templates');
  console.log(items);

  knex.destroy();
}

main();
