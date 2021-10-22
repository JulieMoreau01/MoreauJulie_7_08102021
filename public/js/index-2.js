import { recipes } from './data/recipes.js'
import { Recipes } from './class/Recipes.js'
import { displayDropdown, dropdownSort } from './function/dropdownEvent.js'
import { newRecipes, newIngredients } from './data/cleanRecipes.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

// Template OF CLASS Recipes
function templateRecipes (count) {
  const item = recipes[count]
  const recipesTemplate = new Recipes(item)
  sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
}

// DISPLAY RECIPES AFTER EVENT ON INPUT
function displaySearchRecipes (inputValue) {
  for (let i = 0; i < recipes.length; i++) {
    newRecipes[i] += newIngredients[i]
    const item = newRecipes[i]
    if (item.includes(inputValue) === true) {
      noResult.innerHTML = ''
      templateRecipes(i)
    } else {
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère'
      }
    }
  }
}

// GET INPUT VALUE
function getInputValue () {
  input.addEventListener('keyup', () => {
    sectionRecipes.innerHTML = ''
    noResult.innerHTML = ''
    if (input.value.length < 3) {
      sectionRecipes.innerHTML = ''
    } else if (input.value.length > 2) {
      const inputValue = input.value.toLowerCase()
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
