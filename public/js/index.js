import { recipes } from './data/recipes.js'
import { Recipes } from './class/Recipes.js'
import { displaySearchRecipesInput } from './function/displayRecipes.js'
import { updateListTag } from './function/updateListTag.js'
import { displayDropdown, displayList } from './function/displayDropdown.js'
import { eventDropDownList, eventDropDownInput } from './function/dropdownEvent.js'

const sectionRecipes = document.getElementById('recipes')
const sectionTag = document.querySelector('#tag ul')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

let recipesAfterSearch

/**
 * DISPLAY ALL THE RECIPES
 */
export function displayAllRecipes () {
  recipes.forEach(item => {
    const recipesTemplate = new Recipes(item)
    sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
  })
  updateListTag([], [], 'noName')
  displayDropdown()
  displayList()
  eventDropDownInput(recipesAfterSearch)
  eventDropDownList(recipesAfterSearch)
}

/**
 * GET INPUT VALUE
 */
function getInputValue () {
  input.value = ''
  input.addEventListener('keyup', () => {
    sectionRecipes.innerHTML = ''
    noResult.innerHTML = ''
    recipesAfterSearch = []
    if (input.value.length < 3) {
      sectionTag.innerHTML = ''
      recipesAfterSearch = []
      displayAllRecipes()
    } else if (input.value.length > 2) {
      const inputValue = input.value.toLowerCase()
      displaySearchRecipesInput(inputValue, recipesAfterSearch = [])
    }
  })
}

const init = async () => {
  displayAllRecipes()
  getInputValue()
}

init()
