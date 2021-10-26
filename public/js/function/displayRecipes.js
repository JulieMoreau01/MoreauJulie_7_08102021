import { recipes } from '../data/recipes.js'
import { Recipes } from '../class/Recipes.js'
import { cleanRecipes, cleanRecipesTag } from '../data/cleanRecipes.js'
import { updateListTag } from './updateListTag.js'
import { eventDropDownList, eventDropDownInput } from './dropdownEvent.js'
import { displayDropdown, displayList } from './displayDropdown.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')

export function templateRecipes (idRecipe) {
  idRecipe = recipes[idRecipe]
  const recipesTemplate = new Recipes(idRecipe)
  sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
}

/**
 * DISPLAY RECIPES AFTER EVENT ON INPUT
 */
export function displaySearchRecipesInput (theValue, recipesAfterSearch = []) {
  cleanRecipes.forEach(recipe => {
    const test = recipe.toString().toLowerCase()
    console.log(test)
    const nameRecipe = recipe[1].toString().toLowerCase()
    const descriptionRecipe = recipe[5].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((nameRecipe.includes(theValue) === true) ||
    (descriptionRecipe.includes(theValue) === true) ||
    (ingredients.includes(theValue) === true)) {
      noResult.innerHTML = ''
      recipesAfterSearch.push(recipe)
      recipesAfterSearch.splice(0, recipesAfterSearch.length, ...(new Set(recipesAfterSearch)))
      const idRecipe = recipe[0] - 1
      templateRecipes(idRecipe)
    } else {
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<span><i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère</span>'
      }
    }
  })
  // Mise à jour des listes de Tag
  updateListTag(recipesAfterSearch, [], 'noName')
  displayDropdown()
  displayList()
  eventDropDownInput(recipesAfterSearch)
  eventDropDownList(recipesAfterSearch)
}

/**
 * DISPLAY RECIPES AFTER EVENT ON DROPDOWN LIST
 */
export function displaySearchRecipesTag (tagValue, recipesAfterSearch) {
  let arrayUpdate = []
  sectionRecipes.innerHTML = ''
  if (recipesAfterSearch.length === 0) {
    arrayUpdate = cleanRecipesTag
  } else {
    arrayUpdate = recipesAfterSearch
  }
  let count = 0
  arrayUpdate.forEach(recipe => {
    count++
    if (count === 1) {
      arrayUpdate = []
    }
    const ustensilesRecipe = recipe[7].toString().toLowerCase()
    const appareilRecipe = recipe[6].toString().toLowerCase()
    const ingredients = recipe[3].toString().toLowerCase()
    if ((ustensilesRecipe.includes(tagValue) === true) ||
    (appareilRecipe.includes(tagValue) === true) ||
    (ingredients.includes(tagValue) === true)) {
      noResult.innerHTML = ''
      const idRecipe = recipe[0] - 1
      templateRecipes(idRecipe)
      arrayUpdate.push(recipe)
      arrayUpdate.splice(0, arrayUpdate.length, ...(new Set(arrayUpdate)))
      recipesAfterSearch = arrayUpdate
    } else {
      if (sectionRecipes.innerHTML === '') {
        noResult.innerHTML = '<span><i class="fas fa-exclamation-circle"></i> Aucune recette ne correspond à votre critère</span>'
      }
    }
  })
  // Mise à jour des listes de Tag
  updateListTag(recipesAfterSearch, [], 'noName')
  displayDropdown()
  displayList()
  eventDropDownInput(recipesAfterSearch)
  eventDropDownList(recipesAfterSearch)
}
