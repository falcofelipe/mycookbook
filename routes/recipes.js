const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Recipe = require('../models/Recipe');

// @route     GET api/recipes
// @desc      Get all of the users recipes
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/recipes
// @desc      Add new recipe
// @access    Private
router.post(
  '/',
  auth,
  [
    check('title', 'Please include a recipe title').not().isEmpty(),
    check('title', 'Please include an image URL').not().isEmpty(),
    check(
      'servings',
      'Please include how many servings for the recipe'
    ).isNumeric(),
    check(
      'readyInMinutes',
      'Please include how many minutes until the recipe is ready'
    ).isNumeric(),
    check(
      'ingredients',
      'Please include the ingredients used in the recipe in the form of an array'
    ).isArray(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const {
      title,
      imageUrl,
      icons,
      servings,
      readyInMinutes,
      healthScore,
      dishTypes,
      cuisines,
      diets,
      ingredients,
      instructions,
      fromSpoon,
      spoonId,
    } = req.body;

    try {
      const newRecipe = new Recipe({
        title,
        imageUrl,
        icons,
        servings,
        readyInMinutes,
        healthScore,
        dishTypes,
        cuisines,
        diets,
        ingredients,
        instructions,
        fromSpoon,
        spoonId,
        user: req.user.id,
      });

      const recipe = await newRecipe.save();

      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/recipes/:id
// @desc      Update a recipe
// @access    Private
router.put('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(400).json({ msg: 'There is no recipe with this ID' });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized access' });
    }

    const updatedFields = req.body;

    recipe = await Recipe.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/recipes/:id
// @desc      Delete recipe
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(400).json({ msg: 'There is no recipe with this ID' });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized access' });
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({
      msg: `The recipe with id of ${req.user.id} has been deleted.`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
