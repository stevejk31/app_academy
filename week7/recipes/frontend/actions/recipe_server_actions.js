var AppDispatcher = require('../dispatcher');

var RecipeServerActions = {
  receiveRecipes: function (recipes) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE_RECIPES",
      recipes: recipes
    });
  },
  receiveSingleRecipe: function (recipe) {
    AppDispatcher.dispatch({
      actionType: "ADD_RECIPE",
      recipe: recipe
    });
  }
};

module.exports = RecipeServerActions;
