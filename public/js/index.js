import { recipes } from './data/recipes.js'
import { Recipes } from './class/Recipes.js'
import { openDropDownMenu, closeList, sortList } from './function/dropdownEvent.js'
import { displaySearchRecipesInput } from './function/displayRecipes.js'
import { updateListTag } from './function/updateListTag.js'
import { creatTag } from './function/creatTag.js'
import { displayDropdown, displayList } from './function/displayDropdown.js'

const sectionRecipes = document.getElementById('recipes')
const sectionTag = document.querySelector('#tag ul')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

let recipesAfterSearch

// Display all the recipes at first
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

// GET INPUT VALUE
function getInputValue () {
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

export function eventDropDownInput (recipesAfterSearch) {
  // EVENT ON DROPDOWN INPUT
  const dropdownInput = document.querySelectorAll('#selected input')
  dropdownInput.forEach(item => {
    item.addEventListener('click', () => {
      openDropDownMenu(item)
      item.addEventListener('keyup', () => {
        const inputValue = item.value.toString().toLowerCase()
        sortList(item, inputValue, recipesAfterSearch)
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
      if (recipesAfterSearch === undefined) {
        recipesAfterSearch = []
      }
      creatTag(event, listName, recipesAfterSearch)
      closeList(listName)
    })
  })
}

const init = async () => {
  displayAllRecipes()
  getInputValue()
}

init()
