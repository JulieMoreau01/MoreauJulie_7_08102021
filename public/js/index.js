import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { openDropDownMenu, closeList, sortList } from './dropdownEvent.js'
import { displaySearchRecipesInput } from './displayRecipes.js'
import { updateListTag } from './updateListTag.js'
import { creatTag } from './creatTag.js'
import { displayDropdown, displayList } from './displayDropdown.js'

const sectionRecipes = document.getElementById('recipes')
const sectionTag = document.querySelector('#tag ul')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

let recipesAfterSearch

// Display all the recipes at first
function displayAllRecipes () {
  console.log('displayAllRecipes')
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
  console.log('getInputValue')
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
  console.log('eventDropDownInput')
  // EVENT ON DROPDOWN INPUT
  const dropdownInput = document.querySelectorAll('#selected input')
  console.log('ici')
  dropdownInput.forEach(item => {
    item.addEventListener('click', () => {
      openDropDownMenu(item)
      console.log('click input')
      item.addEventListener('keyup', () => {
        console.log('keyup')
        const inputValue = item.value.toString().toLowerCase()
        sortList(item, inputValue, recipesAfterSearch)
      })
    })
  })
}

export function eventDropDownList (recipesAfterSearch) {
  console.log('eventDropDownList')
  // EVENT ON DROPDOWN LIST
  const listItems = document.querySelectorAll('.list-item')
  listItems.forEach(item => {
    item.addEventListener('click', event => {
      console.log('click listitem')
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
