const express = require('express');
const router = express.Router();
const animationController = require('../ledController/animationController');
var knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

/**** HELPERS ****/

async function getAllAnimations() {
  let templates = await knex.select().table('Templates');
  let animations = [];
  for (let i = 0; i<templates.length; i++) {
    let template = templates[i].name;
    let anims = await knex.from('Animations').innerJoin(template, 'Animations.id', `${template}.id`);
    animations = animations.concat(anims);
  }
  return animations;
}

/* Animation triggers */
router.post('/strandTest', animationController.strandTest);
router.post('/rainbowGradient', animationController.rainbowGradient);
router.post('/rainbowStrip', animationController.rainbowStrip);
router.post('/theaterChase', animationController.theaterChase);

/* Animation database */
/**
 * Valid query params:
 *  onlyFav=true
 */
router.get('/', async (req, res, next) => {
  const onlyFavs = req.query.onlyFav === 'true';
  let result = {}
  if (onlyFavs) {
  
  } else {
    result.animations = await getAllAnimations();
  }
  res.send(result);
})

module.exports = router;
