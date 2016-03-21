var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _recipes = [];
var RecipeStore = new Store(AppDispatcher);

RecipeStore.all = function () {
  return _recipes.slice();
};

RecipeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ADD_RECIPE":
      // _recipes.push(payload.recipe);
      addRecipe(payload.recipe);
      RecipeStore.__emitChange();
      break;
    case "RECEIVE_RECIPES":
      resetRecipes(payload.recipes);
      RecipeStore.__emitChange();
      break;
  }
  console.log(payload);
};

function addRecipe(recipe) {
  _recipes.push(recipe);
}

function resetRecipes(recipes) {
  _recipes = recipes;
}


window.RecipeStore = RecipeStore;
window.AppDispatcher = AppDispatcher;
//   addChangeHandler: function(handler){
//     _handlers.push(handler);
//   },
//   removeChangeHandler: function(handler){
//     var idx = _handlers.indexOf(handler);
//     if (idx !== -1){
//       _handlers.splice(idx, 1);
//     }
//   },
//   changed: function(){
//     _handlers.forEach(function(handler){
//       handler();
//     });
//   }
// };

module.exports = RecipeStore;
