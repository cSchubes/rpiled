const express = require('express');
const router = express.Router();
const animationController = require('../ledController/animationController');
const { HTTP_CODES, ANIMATION_FIELDS } = require('../globals');
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
router.post('/meteor', animationController.meteor);
router.post('/strobe', animationController.strobe);

/* DATABASE */
/**
 * Valid query params:
 *  onlyFav=true
 */
router.get('/', async (req, res, next) => {
  const onlyFavs = req.query.onlyFav === 'true';
  let result = {}
  result.animations = await getAllAnimations(onlyFavs);
  res.status(HTTP_CODES.Ok).send(result);
})

/**
 * Expects the request body to have an animation object with the required fields for the animation.
 */
router.post('/', async (req, res, next) => {
  let customTemplate = req.body.animation;
  let animation = {};
  // remove animation fields from template object
  for (let i = 0; i<ANIMATION_FIELDS.length; i++) {
    animation[ANIMATION_FIELDS[i]] = customTemplate[ANIMATION_FIELDS[i]];
    delete customTemplate[ANIMATION_FIELDS[i]];
  }
  // insert animation
  await knex.insert(animation).into('Animations');
  // get id of inserted animation by grabbing all animations in descending order of id
  let items = await knex.select().table('Animations').orderBy('id', 'desc');
  let id = items[0].id;
  // add id to template object
  customTemplate.id = id;
   // 1. Manual Serialization for JSON/Array fields
  if (customTemplate.color !== undefined && customTemplate.color !== null && Array.isArray(customTemplate.color)) {
    // Ensure the array of RGB objects is converted to a string for SQLite
    customTemplate.color = JSON.stringify(customTemplate.color);
  }
  await knex.insert(customTemplate).into(animation.template);
  res.status(HTTP_CODES.Ok).json({
    message: "Successfully added animation to database."
  })
})

/**
 * Update animation
 */
router.put('/', async (req, res, next) => {
  let customTemplate = req.body.animation;
  let animation = {};
  // separate animation fields from template fields
  for (let i = 0; i<ANIMATION_FIELDS.length; i++) {
    animation[ANIMATION_FIELDS[i]] = customTemplate[ANIMATION_FIELDS[i]];
    delete customTemplate[ANIMATION_FIELDS[i]];
  }
  // grab id and remove for use
  let id = customTemplate.id;
  delete customTemplate.id;
  // update in Animations table
  await knex('Animations').where('id', id).update(animation);
  // update in template specific table
  await knex(animation.template).where('id', id).update(customTemplate);
  res.status(HTTP_CODES.Ok).json({
    message: "Successfully updated animation in database."
  })
})

/**
 * Update animation
 */
router.delete('/', async (req, res, next) => {
  console.log(req.body);
  let id = req.body.id;
  let template = req.body.template;
  let num = await knex('Animations').where('id', id).del();
  let animNum = await knex(template).where('id', id).del();
  res.status(HTTP_CODES.Ok).json({
    message: "Successfully deleted animation from database."
  });
})

/**
 */
router.get('/templates', async (req, res, next) => {
  let template = req.query.name;
  let result = {};
  if (template) {
    let temp = await knex.select().table('Templates').where('name', template);
    result.template = temp[0];
  } else {
    result.templates = await knex.select().table('Templates');
  }
  res.status(HTTP_CODES.Ok).send(result);
})

module.exports = router;
