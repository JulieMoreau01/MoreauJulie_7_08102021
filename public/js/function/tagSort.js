import { uniqueAppareils, uniqueUstensils, uniqueIngredients, updateListTag } from './updateListTag.js'
import { displayList } from './displayDropdown.js'
import { eventDropDownList, eventDropDownInput } from './dropdownEvent.js'

/**
 * SORT THE DROPDOWN MENU LIST WITH INPUT
 */
let newList
let list
export function sortList (item, inputValue, recipesAfterSearch) {
  newList = []
  const name = item.getAttribute('class')

  if (name === 'ustensiles') {
    list = uniqueUstensils
  } else if (name === 'appareil') {
    list = uniqueAppareils
  } else if (name === 'ingredients') {
    list = uniqueIngredients
  }
  // If uniqueIngredients or uniqueAppareils or uniqueUstensils
  // includes Input Value Update the dropdownMenu List
  list.forEach(item => {
    const itemGood = item.toString().toLowerCase()
    if (itemGood.includes(inputValue) === true) {
      newList.push(item)
    }
    newList.splice(0, newList.length, ...(new Set(newList)))
  })
  updateListTag(recipesAfterSearch, newList, name)
  displayList()
  eventDropDownInput(recipesAfterSearch)
  eventDropDownList(recipesAfterSearch)
}
