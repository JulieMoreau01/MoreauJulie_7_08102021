import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { dropdownEvent } from './dropdownEvent.js'
import { newRecipes } from './stringRecipes.js'
import { displayDropdown } from './displayDropdown.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

function templateRecipes (idRecipe) {
  idRecipe = recipes[idRecipe]
  const recipesTemplate = new Recipes(idRecipe)
  sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
}

export const recipesAfterSearch = []

// DISPLAY RECIPES AFTER EVENT ON INPUT
export function displaySearchRecipesInput (theValue) {
  newRecipes.forEach(recipe => {
    const idRecipe = recipe[0] - 1
    const nameRecipe = recipe[1].toString().toLowerCase()
    const descriptionRecipe = recipe[5].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((nameRecipe.includes(theValue) === true) ||
    (descriptionRecipe.includes(theValue) === true) ||
    (ingredients.includes(theValue) === true)) {
      noResult.innerHTML = ''
      templateRecipes(idRecipe)
      recipesAfterSearch.push(recipe)
      recipesAfterSearch.splice(0, recipesAfterSearch.length, ...(new Set(recipesAfterSearch)))
      displayDropdown()
      dropdownEvent()
    } else {
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère'
      }
    }
  })
}

// DISPLAY RECIPES AFTER EVENT ON INPUT OR TAG
export function displaySearchRecipesTag (tagValue) {
  newRecipes.forEach(recipe => {
    const idRecipe = recipe[0] - 1
    const nameRecipe = recipe[1].toString().toLowerCase()
    const descriptionRecipe = recipe[5].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((nameRecipe.includes(tagValue) === true) ||
    (descriptionRecipe.includes(tagValue) === true) ||
    (ingredients.includes(tagValue) === true)) {
      noResult.innerHTML = ''
      templateRecipes(idRecipe)
      recipesAfterSearch.push(recipe)
      recipesAfterSearch.splice(0, recipesAfterSearch.length, ...(new Set(recipesAfterSearch)))
      displayDropdown()
      dropdownEvent()
    } else {
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère'
      }
    }
  })
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
      displaySearchRecipesInput(inputValue)
    }
  })
}

const init = async () => {
  getInputValue()
  displayDropdown()
  dropdownEvent()
}

init()
