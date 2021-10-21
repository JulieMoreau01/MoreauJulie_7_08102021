import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { cleanRecipes } from './cleanRecipes.js'
import { displayDropdown, displayList } from './displayDropdown.js'
import { updateListTag } from './updateListTag.js'
import { eventDropDownList, eventDropDownInput } from './index.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

let arrayUpdate = []

function templateRecipes (idRecipe) {
  idRecipe = recipes[idRecipe]
  const recipesTemplate = new Recipes(idRecipe)
  sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
}

function creatRecipesAfterSearch (recipe, recipesAfterSearch) {
  recipesAfterSearch.push(recipe)
  recipesAfterSearch.splice(0, recipesAfterSearch.length, ...(new Set(recipesAfterSearch)))
  const idRecipe = recipe[0] - 1
  console.log(recipesAfterSearch)
  templateRecipes(idRecipe)
  // Mise à jour des listes de Tag
  updateListTag(recipesAfterSearch, [], 'noName')
  displayDropdown()
  displayList()
  eventDropDownInput()
  eventDropDownList(recipesAfterSearch)
  return recipesAfterSearch
}

function creatRecipesAfterTag (recipe, recipesAfterSearch) {
  if ((recipesAfterSearch.length === 0) || (recipesAfterSearch === undefined)) {
    arrayUpdate = cleanRecipes
  } else {
    arrayUpdate = recipesAfterSearch
  }
  const idRecipe = recipe[0] - 1
  delete arrayUpdate[idRecipe]
  // Mise à jour des listes de Tag
  updateListTag(recipesAfterSearch, [], 'noName')
  displayDropdown()
  displayList()
  eventDropDownInput()
  eventDropDownList()
}

// DISPLAY RECIPES AFTER EVENT ON INPUT
export function displaySearchRecipesInput (theValue) {
  let recipesAfterSearch = []
  cleanRecipes.forEach(recipe => {
    const nameRecipe = recipe[1].toString().toLowerCase()
    const descriptionRecipe = recipe[5].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((nameRecipe.includes(theValue) === true) ||
    (descriptionRecipe.includes(theValue) === true) ||
    (ingredients.includes(theValue) === true)) {
      noResult.innerHTML = ''
      creatRecipesAfterSearch(recipe, recipesAfterSearch)
    } else {
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère'
      }
    }
  })
}

// DISPLAY RECIPES AFTER EVENT ON TAG
export function displaySearchRecipesTag (tagValue, recipesAfterSearch = []) {
  sectionRecipes.innerHTML = ''
  console.log('ici' + recipesAfterSearch)
  if ((recipesAfterSearch.length === 0) || (recipesAfterSearch === undefined)) {
    arrayUpdate = cleanRecipes
  } else {
    arrayUpdate = recipesAfterSearch
  }
  arrayUpdate.forEach(recipe => {
    const ustensilesRecipe = recipe[7].toString().toLowerCase()
    const appareilRecipe = recipe[6].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((ustensilesRecipe.includes(tagValue) === true) ||
    (appareilRecipe.includes(tagValue) === true) ||
    (ingredients.includes(tagValue) === true)) {
      noResult.innerHTML = ''
      const idRecipe = recipe[0] - 1
      templateRecipes(idRecipe)
    } else {
      creatRecipesAfterTag(recipe, recipesAfterSearch)
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère'
      }
    }
  })
}

export function removeRecipeFromArray (removeValue) {
  const tag = document.querySelectorAll('section#tag ul li')
  if (tag.length === 0) {
    sectionRecipes.innerHTML = ''
    const inputValue = input.value.toLowerCase()
    displaySearchRecipesInput(inputValue)
  } else {
    tag.forEach(item => {
      sectionRecipes.innerHTML = ''
      const tagValue = item.textContent.toLowerCase()
      const inputValue = input.value.toLowerCase()
      displaySearchRecipesInput(inputValue)
      displaySearchRecipesTag(tagValue)
    })
  }
}
