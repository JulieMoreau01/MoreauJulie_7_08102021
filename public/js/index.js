import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { dropdownEvent } from './dropdownEvent.js'
import { cleanRecipes } from './cleanRecipes.js'
import { displayDropdown } from './displayDropdown.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

function templateRecipes (idRecipe) {
  idRecipe = recipes[idRecipe]
  const recipesTemplate = new Recipes(idRecipe)
  sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
}

function creatRecipesAfterSearch (recipe) {
  recipesAfterSearch.push(recipe)
  recipesAfterSearch.splice(0, recipesAfterSearch.length, ...(new Set(recipesAfterSearch)))
  console.log(recipesAfterSearch)
  displayDropdown()
  dropdownEvent()
  const idRecipe = recipe[0] - 1
  templateRecipes(idRecipe)
}

export let recipesAfterSearch = []

// DISPLAY RECIPES AFTER EVENT ON INPUT
export function displaySearchRecipesInput (theValue) {
  cleanRecipes.forEach(recipe => {
    const nameRecipe = recipe[1].toString().toLowerCase()
    const descriptionRecipe = recipe[5].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((nameRecipe.includes(theValue) === true) ||
    (descriptionRecipe.includes(theValue) === true) ||
    (ingredients.includes(theValue) === true)) {
      noResult.innerHTML = ''
      creatRecipesAfterSearch(recipe)
    } else {
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère'
      }
    }
  })
}

// DISPLAY RECIPES AFTER EVENT ON TAG
export function displaySearchRecipesTag (tagValue) {
  let arrayUpdate
  if (recipesAfterSearch.length === 0) {
    arrayUpdate = cleanRecipes
  } else {
    arrayUpdate = recipesAfterSearch
  }
  recipesAfterSearch = []
  sectionRecipes.innerHTML = ''
  console.log('lalala')
  arrayUpdate.forEach(recipe => {
    const nameRecipe = recipe[1].toString().toLowerCase()
    const descriptionRecipe = recipe[5].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((nameRecipe.includes(tagValue) === true) ||
    (descriptionRecipe.includes(tagValue) === true) ||
    (ingredients.includes(tagValue) === true)) {
      noResult.innerHTML = ''
      creatRecipesAfterSearch(recipe)
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
    recipesAfterSearch = []
    if (input.value.length < 3) {
      sectionRecipes.innerHTML = ''
      recipesAfterSearch = []
    } else if (input.value.length > 2) {
      const inputValue = input.value.toLowerCase()
      displaySearchRecipesInput(inputValue)
    }
  })
}

export function removeRecipeFromArray (removeValue) {
  const tag = document.querySelector('section#tag ul li')
  console.log(tag)
  if (tag === null) {
    sectionRecipes.innerHTML = ''
    const inputValue = input.value.toLowerCase()
    displaySearchRecipesInput(inputValue)
  } else {
    sectionRecipes.innerHTML = ''
    const tagValue = tag.textContent.toLowerCase()
    console.log(tagValue)
    const inputValue = input.value.toLowerCase()
    displaySearchRecipesInput(inputValue)
    displaySearchRecipesTag(tagValue)
  }
}


const init = async () => {
  getInputValue()
  displayDropdown()
  dropdownEvent()
}

init()
