import { creatTag } from './tagCreat.js'
import { sortList } from './tagSort.js'

// OPEN DROPDOWN
export function openDropDownMenu (item) {
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

/**
 * EVENT ON INPUT
 */
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

/**
 * EVENT ON LIST ITEM
 */
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

// CLOSE THE DROPDOWN MENU
export function closeList (item) {
  const dropdown = document.querySelector('ul.' + item)
  const list = dropdown.querySelector('.list')
  list.classList.remove('open')
  dropdown.classList.remove('arrowOpen')
}
