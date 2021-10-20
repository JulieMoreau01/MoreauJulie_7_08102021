import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { cleanRecipes } from './cleanRecipes.js'
import { displayDropdown, displayList } from './displayDropdown.js'
import { updateListeTag } from './listGeneration.js'
import { recipesAfterSearch, eventDropDownList, eventDropDownInput } from './index.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

export let arrayUpdate

function templateRecipes (idRecipe) {
  idRecipe = recipes[idRecipe]
  const recipesTemplate = new Recipes(idRecipe)
  sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
}

function creatRecipesAfterSearch (recipe) {
  recipesAfterSearch.push(recipe)
  recipesAfterSearch.splice(0, recipesAfterSearch.length, ...(new Set(recipesAfterSearch)))
  const idRecipe = recipe[0] - 1
  templateRecipes(idRecipe)
  // Mise à jour des listes de Tag
  const newList = []
  const name = 'noName'
  updateListeTag(recipesAfterSearch, newList, name)
  displayDropdown()
  displayList()
  eventDropDownInput()
  eventDropDownList()
}

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
  sectionRecipes.innerHTML = ''
  if (recipesAfterSearch.length === 0) {
    arrayUpdate = cleanRecipes
  } else {
    arrayUpdate = recipesAfterSearch
  }
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

export function removeRecipeFromArray (removeValue) {
  const tag = document.querySelector('section#tag ul li')
  if (tag === null) {
    sectionRecipes.innerHTML = ''
    const inputValue = input.value.toLowerCase()
    displaySearchRecipesInput(inputValue)
  } else {
    sectionRecipes.innerHTML = ''
    const tagValue = tag.textContent.toLowerCase()
    const inputValue = input.value.toLowerCase()
    displaySearchRecipesInput(inputValue)
    displaySearchRecipesTag(tagValue)
  }
}
