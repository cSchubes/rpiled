const express = require('express');
const router = express.Router();
const animationController = require('../ledController/animationController');
const globals = require('../globals');
var knexfile = require('../../knexfile');
const stage = (process.env.NODE_ENV || 'development');
const knex = require('knex')(knexfile[stage]);

/**** HELPERS ****/
async function getAllAnimations(favs) {
  let templates = await knex.select().table('Templates');
  let animations = [];
  for (let i = 0; i<templates.length; i++) {
    let template = templates[i].name;
    if (template !== 'strandTest') {
      let anims;
      if (favs) {
        anims = await knex.from('Animations').innerJoin(template, 'Animations.id', `${template}.id`).where('favorite', 1);
      } else {
        anims = await knex.from('Animations').innerJoin(template, 'Animations.id', `${template}.id`);
      }
      animations = animations.concat(anims);
    }
  }
  return animations;
}



/**** TRIGGERS ****/
router.post('/strandTest', animationController.strandTest);
router.post('/rainbowGradient', animationController.rainbowGradient);
router.post('/rainbowStrip', animationController.rainbowStrip);
router.post('/theaterChase', animationController.theaterChase);

/* DATABASE */
/**
 * Valid query params:
 *  onlyFav=true
 */
router.get('/', async (req, res, next) => {
  const onlyFavs = req.query.onlyFav === 'true';
  let result = {}
  result.animations = await getAllAnimations(onlyFavs);
  res.status(globals.HTTP_CODES.Ok).send(result);
})

/**
 * Expects the request body to have an animation object with the required fields for the animation.
 */
router.post('/', async (req, res, next) => {
  let customTemplate = req.body.animation;
  let animation = {};
  // remove animation fields from template object
  for (let i = 0; i<globals.animationFields.length; i++) {
    animation[globals.animationFields[i]] = customTemplate[globals.animationFields[i]];
    delete customTemplate[globals.animationFields[i]];
  }
  // insert animation
  await knex.insert(animation).into('Animations');
  // get id of inserted animation by grabbing all animations in descending order of id
  let items = await knex.select().table('Animations').orderBy('id', 'desc');
  let id = items[0].id;
  // add id to template object
  customTemplate.id = id;
  await knex.insert(customTemplate).into(animation.template);
  res.status(globals.HTTP_CODES.Ok).json({
    message: "Successfully added animation to database."
  })
})

router.get('/templates', async (req, res, next) => {
  let result = {};
  result.templates = await knex.select().table('Templates');
  res.status(globals.HTTP_CODES.Ok).send(result);
})

router.post('/delete', async (req, res, next) => {
  let id = req.body.id;
  let template = req.body.template;
  console.log(req.body);
  let num = await knex.select('Animations').where('id', id).del();
  let animNum = await knex.select(template).where('id', id).del();
  console.log(num);
  console.log(animNum);
  res.status(globals.HTTP_CODES.Ok);
})
module.exports = router;
