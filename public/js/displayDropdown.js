import { recipesAfterSearch } from './index.js'
import { newRecipes } from './StringRecipes.js'
import { Dropdown } from './DropdownClass.js'

export let uniqueUstensils
export let uniqueAppareils
export let uniqueIngredients
// DISPLAY DROPDOWN
export function displayDropdown () {
  const sectionFilter = document.getElementById('filter')

  let arrayUpdate
  if (recipesAfterSearch.length === 0) {
    arrayUpdate = newRecipes
  } else {
    arrayUpdate = recipesAfterSearch
  }

  const dropdownArray = [
    {
      name: 'ingredients',
      list: getIngredients()
    },
    {
      name: 'appareil',
      list: getAppareils()
    },
    {
      name: 'ustensiles',
      list: getUstensiles()
    }
  ]
  sectionFilter.innerHTML = ''
  dropdownArray.forEach(item => {
    const recipesTemplate = new Dropdown(item)
    sectionFilter.innerHTML += recipesTemplate.creatHtmlDropdown()
  })

  // LISTE USTENCILES
  function getUstensiles () {
    const ustensilsArray = []
    arrayUpdate.forEach(item => {
      const ustensils = item[7]
      ustensils.forEach(item => {
        ustensilsArray.push(item)
      })
    })
    uniqueUstensils = [...new Set(ustensilsArray)]
    return uniqueUstensils
  }

  // LISTE APPAREIL
  function getAppareils () {
    const appareilsArray = []
    arrayUpdate.forEach(item => {
      const appareils = item[6]
      appareilsArray.push(appareils)
    })
    uniqueAppareils = [...new Set(appareilsArray)]
    return uniqueAppareils
  }

  // LISTE INGREDIENTS
  function getIngredients () {
    const ingredientsArray = []
    arrayUpdate.forEach(item => {
      const ingredients = item[3]
      ingredients.forEach(item => {
        ingredientsArray.push(item)
      })
    })
    uniqueIngredients = [...new Set(ingredientsArray)]
    return uniqueIngredients
  }
}
