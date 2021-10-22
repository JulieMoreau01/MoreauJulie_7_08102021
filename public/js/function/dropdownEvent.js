import { displayList } from './displayDropdown.js'
import { uniqueAppareils, uniqueUstensils, uniqueIngredients, updateListTag } from './updateListTag.js'
import { eventDropDownList, eventDropDownInput } from '../index.js'

// OPEN DROPDOWN
export function openDropDownMenu (item) {
  console.log(item)
  const dropdown = item.parentElement.parentElement
  const dropdownAll = document.querySelectorAll('ul.dropdown')
  const listAll = document.querySelectorAll('.list')
  const list = dropdown.querySelector('.list')
  const idName = list.getAttribute('id')
  list.classList.add('open')
  dropdown.classList.add('arrowOpen')
  // Close Other Dropdown
  listAll.forEach(item => {
    const idNameItem = item.getAttribute('id')
    if ((item.classList.contains('open') === true) && (idNameItem !== idName)) {
      item.classList.remove('open')
    }
  })
  dropdownAll.forEach(item => {
    const idNameItem = item.getAttribute('id')
    if ((item.classList.contains('arrowOpen') === true) && (idNameItem !== idName)) {
      item.classList.remove('arrowOpen')
    }
  })
  // CLose DropDown on click anywhere else
  document.addEventListener('click', (event) => {
    const isClickInsideElement = dropdown.contains(event.target)
    if (!isClickInsideElement) {
      list.classList.remove('open')
      dropdown.classList.remove('arrowOpen')
    }
  })
}

// SORT TAG LIST
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

// CLOSE THE DROPDOWN MENU
export function closeList (item) {
  const dropdown = document.querySelector('ul.' + item)
  const list = dropdown.querySelector('.list')
  list.classList.remove('open')
  dropdown.classList.remove('arrowOpen')
}
