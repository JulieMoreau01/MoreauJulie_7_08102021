import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'

const sectionRecipes = document.getElementById('recipes')

// DISPLAY RECIPES AFETR EVENT ON INPUT
function displaySearchRecipes (inputValue) {
  recipes.forEach(item => {
    // Transform Item in array and then in String
    const itemArray = Object.values(item)
    const itemString = itemArray.toString()
    if (itemString.toLowerCase().includes(inputValue.toLowerCase()) === true) {
      const recipesTemplate = new Recipes(item)
      sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
    }
  })
}

// GET INPUT VALUE
function getInputValue () {
  const input = document.querySelector('input')
  input.addEventListener('keyup', () => {
    if (input.value.length < 3) {
      sectionRecipes.innerHTML = ''
    } else if (input.value.length > 3) {
      const inputValue = input.value
      displaySearchRecipes(inputValue)
    }
  })
}

const init = async () => {
  getInputValue()
}

init()
