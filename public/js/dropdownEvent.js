import { displayList } from './displayDropdown.js'
import { uniqueAppareils, uniqueUstensils, uniqueIngredients, updateListTag } from './updateListTag.js'
import { eventDropDownList, eventDropDownInput } from './index.js'

// OPEN DROPDOWN
export function openDropDownMenu (item) {
  console.log('openDropDownMenu')
  const dropdown = item.parentElement.parentElement
  const listAll = document.querySelectorAll('.list')
  const list = dropdown.querySelector('.list')
  console.log(list)
  const idName = list.getAttribute('id')
  dropdown.classList.toggle('arrowOpen')
  list.classList.toggle('open')
  // Close Other Dropdown
  listAll.forEach(item => {
    const idNameItem = item.getAttribute('id')
    if ((item.classList.contains('open') === true) && (idNameItem !== idName)) {
      item.classList.remove('open')
    }
  })
  // CLose DropDown on click anywhere else
  document.addEventListener('click', (event) => {
    const isClickInsideElement = dropdown.contains(event.target)
    if (!isClickInsideElement) {
      list.classList.remove('open')
    }
  })
}

// SORT TAG LIST
let newList
let list
export function sortList (item, inputValue, recipesAfterSearch) {
  console.log('sortList')
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
  console.log('closeList')
  const dropdown = document.querySelector('ul.' + item)
  const list = dropdown.querySelector('.list')
  list.classList.remove('open')
  dropdown.classList.remove('arrowOpen')
}
