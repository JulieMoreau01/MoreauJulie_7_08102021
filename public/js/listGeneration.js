import { cleanRecipes } from './cleanRecipes.js'
import { displayDropdown, displayList } from './displayDropdown.js'
import { eventDropDownInput, eventDropDownList } from './index.js'

export let uniqueUstensils
export let uniqueAppareils
export let uniqueIngredients
export let dropdownArray

export function updateListeTag (recipesAfterSearch, newList, name) {
  if (newList.length === 0) {
    console.log('1')
    let arrayUpdate

    if (recipesAfterSearch.length === 0) {
      arrayUpdate = cleanRecipes
    } else {
      arrayUpdate = recipesAfterSearch
    }

    // LISTE USTENCILES

    const ustensilsArray = []
    arrayUpdate.forEach(item => {
      const ustensils = item[7]
      ustensils.forEach(item => {
        const stringItem = item.toString().toLowerCase()
        ustensilsArray.push(stringItem)
      })
    })
    uniqueUstensils = [...new Set(ustensilsArray)].sort()

    // LISTE APPAREIL
    const appareilsArray = []
    arrayUpdate.forEach(item => {
      const appareils = item[6]
      const stringItem = appareils.toString().toLowerCase()
      appareilsArray.push(stringItem)
    })
    uniqueAppareils = [...new Set(appareilsArray)].sort()

    // LISTE INGREDIENTS

    const ingredientsArray = []
    arrayUpdate.forEach(item => {
      const ingredients = item[3]
      ingredients.forEach(item => {
        const stringItem = item.toString().toLowerCase()
        ingredientsArray.push(stringItem)
      })
    })
    uniqueIngredients = [...new Set(ingredientsArray)].sort()
  } else {
    if (name === 'ingredients') {
      uniqueIngredients = newList
    } else if (name === 'appareil') {
      uniqueAppareils = newList
    } else if (name === 'ustensiles') {
      uniqueUstensils = newList
    }
    displayList()
  }
  dropdownArray = [
    {
      name: 'ingredients',
      list: uniqueIngredients
    },
    {
      name: 'ustensiles',
      list: uniqueUstensils
    },
    {
      name: 'appareil',
      list: uniqueAppareils
    }
  ]
  eventDropDownInput()
  eventDropDownList()
}
