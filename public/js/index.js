import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { displayDropdown, dropdownSort } from './dropdown.js'
const sectionRecipes = document.getElementById('recipes')

// DISPLAY RECIPES AFTER EVENT ON INPUT
function displaySearchRecipes (inputValue) {
  recipes.forEach(item => {
    // Transform Item in array and then in String
    const itemArray = Object.values(item)
    const itemString = itemArray.toString()

    // Transform Ingredient in array and then in String
    const itemIngredients = item.ingredients
    itemIngredients.forEach(ing => {
      const itemIngredientsArray = Object.values(ing)
      const itemIngredientsArrayString = itemIngredientsArray.toString()
      const ingredient = itemIngredientsArrayString

      if ((itemString.toLowerCase().includes(inputValue.toLowerCase()) === true) ||
       (ingredient.toLowerCase().includes(inputValue.toLowerCase()) === true)) {
        const element = document.getElementById(item.id)
        if (element === null) {
          const recipesTemplate = new Recipes(item)
          sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
        }
      }
    })
  })
}

// GET INPUT VALUE
function getInputValue () {
  const input = document.querySelector('input')
  input.addEventListener('keyup', () => {
    sectionRecipes.innerHTML = ''
    if (input.value.length < 3) {
      sectionRecipes.innerHTML = ''
    } else if (input.value.length > 2) {
      const inputValue = input.value
      displaySearchRecipes(inputValue)
    }
  })
}

const init = async () => {
  getInputValue()
  displayDropdown()
  dropdownSort()
}

init()
