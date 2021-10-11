import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'

function displayRecipe (recipes) {
  recipes.forEach(item => {
    const sectionRecipes = document.getElementById('recipes')
    const recipesTemplate = new Recipes(item)
    sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
  })
}

const init = async () => {
  displayRecipe(recipes)
}

init()
