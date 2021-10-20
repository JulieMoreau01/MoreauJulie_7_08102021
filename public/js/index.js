import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { openDropDownMenu, closeList, sortList } from './dropdownEvent.js'
import { displaySearchRecipesInput } from './displayRecipes.js'
import { displayDropdown, displayList } from './displayDropdown.js'
import { updateListeTag } from './listGeneration.js'
import { creatTag } from './creatTag.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')
export let arrayUpdate
export let recipesAfterSearch
let newList = []

// Display all the recipes at first
function displayAllRecipes () {
  recipes.forEach(item => {
    const recipesTemplate = new Recipes(item)
    sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
  })
  recipesAfterSearch = []
  newList = []
  const name = 'noName'
  updateListeTag(recipesAfterSearch, newList, name)
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
      sectionRecipes.innerHTML = ''
      recipesAfterSearch = []
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
        console.log('keyup')
        const inputValue = item.value.toString().toLowerCase()
        sortList(item, inputValue)
      })
    })
  })
}

export function eventDropDownList () {
  // EVENT ON DROPDOWN LIST
  const listItems = document.querySelectorAll('.list-item')
  listItems.forEach(item => {
    item.addEventListener('click', event => {
      if (item.classList.contains('ustensiles') === true) {
        const name = 'ustensiles'
        creatTag(event, name)
        closeList('ustensiles')
      } else if (item.classList.contains('appareil') === true) {
        const name = 'appareil'
        creatTag(event, name)
        closeList('appareil')
      } else if (item.classList.contains('ingredients') === true) {
        const name = 'ingredients'
        creatTag(event, name)
        closeList('ingredients')
      }
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
