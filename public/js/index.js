import { recipes } from './recipes.js'
import { Recipes } from './RecipesClass.js'
import { displayDropdown, dropdownSort, arrayTag } from './dropdown.js'
import { newRecipes, newIngredients } from './stringRecipes.js'

const sectionRecipes = document.getElementById('recipes')
const noResult = document.getElementById('no_result')
const input = document.querySelector('input')

function templateRecipes (count) {
  const item = recipes[count]
  const recipesTemplate = new Recipes(item)
  sectionRecipes.innerHTML += recipesTemplate.creatHtmlRecipe()
}

// DISPLAY RECIPES AFTER EVENT ON INPUT
function displaySearchRecipes (theValue) {
  let count = -1
  newRecipes.forEach(item => {
    count++
    item += newIngredients[count]
    if (item.includes(theValue) === true) {
      noResult.innerHTML = ''
      templateRecipes(count)
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
    if (input.value.length < 3) {
      sectionRecipes.innerHTML = ''
    } else if (input.value.length > 2) {
      const inputValue = input.value.toLowerCase()
      displaySearchRecipes(inputValue)
    }
  })
}

// const tagValue = 'roblochon'

// GET TAG VALUE
export function getTagValue (arrayTag) {
  console.log(arrayTag)
  noResult.innerHTML = ''
  if (arrayTag !== '') {
    displaySearchRecipes(arrayTag)
  }
}

const init = async () => {
  getInputValue()
  displayDropdown()
  dropdownSort()
}

init()
