/**
 * This file acts as a router for the color functionalities.
 * Makes ORM calls to database, as well as running python APIs to trigger lights.
 */
const express = require('express');
const router = express.Router();
const animationController = require('../ledController/animationController');
const { HTTP_CODES, ANIMATION_FIELDS } = require('../globals');
var knexfile = require('../../knexfile');
const stage = (process.env.NODE_ENV || 'development');
const colorController = require('../ledController/colorController');
const knex = require('knex')(knexfile[stage]);

/**** HELPERS ****/
async function getAllColors(favs) {
  let allColors;

  if (favs) 
    allColors = await knex.select().table('Colors').where('favorite', 1);
  else
    allColors = await knex.select().table('Colors');

  return allColors;
}



/**** TRIGGERS ****/
router.post('/setColor', colorController.setColor);

/* DATABASE */
/**
 * Gets all saved/favorite colors depending on input parameter
 * Valid query params:
 *  onlyFav=true
 */
router.get('/', async (req, res, next) => {
  console.log("hit")
  const onlyFavs = req.query.onlyFav === 'true';
  let result = {}
  result.colors = await getAllColors(onlyFavs);
  res.status(HTTP_CODES.Ok).send(result);
})

/**
 * Adds a color to the database
 * TODO: Prevent duplicate colors from being added
 * Expects the request body to have an animation object with the required fields for the animation.
 */
router.post('/', async (req, res, next) => {
  let colorVar = req.body.color;
  await knex.insert(colorVar).into('Colors');
  colorVar.message = "Successfully added color to database."
  res.status(HTTP_CODES.Ok).json(colorVar);
})

/**
 * Update colors
 */
router.put('/', async (req, res, next) => {
  let newColor = req.body.color;
  let id = newColor.id;
  delete newColor.id;

  await knex('Colors').where('id', id).update(newColor);
  res.status(HTTP_CODES.Ok).json({
    message: "Successfully updated color in database."
  })
})

/**
 * Delete colors
 */
router.delete('/', async (req, res, next) => {
  let newColor = req.body.color;
  let id = newColor.id;
  let deletedColor = await knex('Colors').where('id', id).del();
  res.status(HTTP_CODES.Ok).json({
    message: "Successfully deleted colors from database."
  })
})


module.exports = router;
