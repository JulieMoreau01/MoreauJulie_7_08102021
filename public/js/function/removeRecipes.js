import { cleanRecipesTag } from '../data/cleanRecipes.js'
import { displayAllRecipes } from '../index.js'
import { templateRecipes } from './displayRecipes.js'
import { updateListTag } from './updateListTag.js'
import { eventDropDownList, eventDropDownInput } from './dropdownEvent.js'
import { displayDropdown, displayList } from './displayDropdown.js'

const input = document.querySelector('input')
const sectionRecipes = document.getElementById('recipes')

export function removeRecipeFromArray () {
  // let recipesAfterSearch = []
  const tag = document.querySelectorAll('section#tag ul li')
  const inputValue = input.value.toLowerCase()
  if (inputValue === '') {
    // NO Input & TAG
    if (tag.length !== 0) {
      removeDisplaySearchRecipesTag(tag)
    // NO Input & NO TAG
    } else {
      displayAllRecipes()
    }
  } else {
    // Input & No TAG
    if (tag.length === 0) {
      sectionRecipes.innerHTML = ''
      removeDisplaySearchRecipesTag(tag)
    // Input & TAG
    } else {
      sectionRecipes.innerHTML = ''
      removeDisplaySearchRecipesTag(tag)
    }
  }
}

/**
 * DISPLAY RECIPES AFTER REMOVE TAG
 */
function removeDisplaySearchRecipesTag (tag) {
  const inputValue = input.value.toLowerCase()
  const listOfTag = []
  tag.forEach(item => {
    const listOfDropdownTag = item.textContent.toLowerCase()
    listOfTag.push(listOfDropdownTag)
  })
  if (inputValue !== '') {
    listOfTag.unshift(inputValue)
  }
  let arrayUpdate = []
  for (let i = 0; i < listOfTag.length; i++) {
    sectionRecipes.innerHTML = ''
    const tagValue = listOfTag[i]
    if (i === 0) {
      arrayUpdate = cleanRecipesTag
    }
    let count = 0
    arrayUpdate.forEach(recipe => {
      count++
      if (count === 1) {
        arrayUpdate = []
      }
      if ((inputValue !== '') && (i === 0)) {
        const nameRecipe = recipe[1].toString().toLowerCase()
        const descriptionRecipe = recipe[5].toString().toLowerCase()
        const ingredients = recipe[3].toString().toLowerCase()
        if ((nameRecipe.includes(tagValue) === true) ||
        (descriptionRecipe.includes(tagValue) === true) ||
        (ingredients.includes(tagValue) === true)) {
          const idRecipe = recipe[0] - 1
          templateRecipes(idRecipe)
          arrayUpdate.push(recipe)
          arrayUpdate.splice(0, arrayUpdate.length, ...(new Set(arrayUpdate)))
        }
      } else {
        const ustensilesRecipe = recipe[7].toString().toLowerCase()
        const appareilRecipe = recipe[6].toString().toLowerCase()
        const ingredients = recipe[3].toString().toLowerCase()
        if ((ustensilesRecipe.includes(tagValue) === true) ||
        (appareilRecipe.includes(tagValue) === true) ||
        (ingredients.includes(tagValue) === true)) {
          const idRecipe = recipe[0] - 1
          templateRecipes(idRecipe)
          arrayUpdate.push(recipe)
          arrayUpdate.splice(0, arrayUpdate.length, ...(new Set(arrayUpdate)))
        }
      }
    })
    // Mise à jour des listes de Tag
    updateListTag(arrayUpdate, [], 'noName')
    displayDropdown()
    displayList()
    eventDropDownInput(arrayUpdate)
    eventDropDownList(arrayUpdate)
  }
}
