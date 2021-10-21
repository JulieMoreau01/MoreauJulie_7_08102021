import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { openDropDownMenu, closeList, sortList } from './dropdownEvent.js'
import { displaySearchRecipesInput } from './displayRecipes.js'
import { displayDropdown, displayList } from './displayDropdown.js'
import { updateListTag } from './updateListTag.js'
import { creatTag } from './creatTag.js'
//import { cleanRecipes } from './cleanRecipes.js'

const sectionRecipes = document.getElementById('recipes')
const sectionTag = document.querySelector('#tag ul')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

export let recipesAfterSearch = []

// Display all the recipes at first
function displayAllRecipes () {
  recipes.forEach(item => {
    const recipesTemplate = new Recipes(item)
    sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
  })
  updateListTag([], [], 'noName')
  displayDropdown()
  displayList()
}

// GET INPUT VALUE
function getInputValue () {
  input.addEventListener('keyup', () => {
    sectionRecipes.innerHTML = ''
    noResult.innerHTML = ''
    recipesAfterSearch = []
    if (input.value.length < 3) {
      sectionTag.innerHTML = ''
      displayAllRecipes()
    } else if (input.value.length > 2) {
      const inputValue = input.value.toLowerCase()
      displaySearchRecipesInput(inputValue)
    }
  })
}

export function eventDropDownInput () {
  // EVENT ON DROPDOWN INPUT
  const dropdownInput = document.querySelectorAll('#selected input')
  dropdownInput.forEach(item => {
    item.addEventListener('click', () => {
      openDropDownMenu(item)
      item.addEventListener('keyup', () => {
        const inputValue = item.value.toString().toLowerCase()
        sortList(item, inputValue)
        displayList()
        eventDropDownList()
      })
    })
  })
}

export function eventDropDownList (recipesAfterSearch) {
  // EVENT ON DROPDOWN LIST
  const listItems = document.querySelectorAll('.list-item')
  listItems.forEach(item => {
    item.addEventListener('click', event => {
      const listName = item.getAttribute('class').replace('list-item ', '')
      creatTag(event, listName, recipesAfterSearch)
      closeList(listName)
    })
  })
}

const init = async () => {
  displayAllRecipes()
  getInputValue()
  eventDropDownInput()
  eventDropDownList()
}

init()
