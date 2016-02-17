var React = require('react');
var RecipesForm = require('./RecipesForm');
var RecipesList = require('./RecipesList');
var RecipeStore = require('../stores/recipe');
var RecipeActions = require('../actions/recipe_actions');

var Recipes = React.createClass({
  getInitialState: function () {
    return { recipes: RecipeStore.all() };
  },
  createRecipe: function(recipe){
    // RecipeStore.create(recipe);
    RecipeActions.createRecipe(recipe);
  },
  _recipesChanged: function () {
    this.setState({recipes: RecipeStore.all()});
  },
  componentDidMount: function(){
    // RecipeStore.addChangeHandler(this._recipesChanged);
    RecipeStore.addListener(this._recipesChanged);
    RecipeActions.fetchRecipes();
    // RecipeStore.fetch();
    //cannot do this right here
    // this.setState({recipes: RecipeStore.all()});
  },
  render: function () {
    return (
      <div>
          <RecipesForm create={this.createRecipe}/>
          {(this.state.recipes.length > 0 ? <RecipesList recipes={this.state.recipes}/> : "No recipes")}
      </div>
    );
  }
});

module.exports = Recipes;
