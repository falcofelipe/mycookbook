const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  icons: {
    type: Array,
  },
  servings: {
    type: Number,
    required: true,
  },
  readyInMinutes: {
    type: Number,
    required: true,
  },
  healthScore: {
    type: Number,
  },
  dishTypes: {
    type: Array,
  },
  cuisines: {
    type: Array,
  },
  diets: {
    type: Array,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  instructions: {
    type: Array,
  },
  fromSpoon: {
    type: Boolean,
    default: false,
  },
  spoonId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
