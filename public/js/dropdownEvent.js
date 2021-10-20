import { uniqueAppareils, uniqueUstensils, uniqueIngredients, updateListeTag } from './listGeneration.js'

// OPEN DROPDOWN
export function openDropDownMenu (item) {
  const dropdown = item.parentElement.parentElement
  const listAll = document.querySelectorAll('.list')
  const list = dropdown.querySelector('.list')
  const idName = list.getAttribute('id')
  dropdown.classList.toggle('arrowOpen')
  list.classList.toggle('open')
  listAll.forEach(item => {
    const idNameItem = item.getAttribute('id')
    if ((item.classList.contains('open') === true) && (idNameItem !== idName)) {
      item.classList.remove('open')
    }
  })
}

let newList = []
let name
export function sortList (item, inputValue) {
  newList = []
  let list
  if (item.classList.contains('ustensiles') === true) {
    const list = uniqueUstensils
    name = 'ustensiles'
    list.forEach(item => {
      const itemGood = item.toString().toLowerCase()
      if (itemGood.includes(inputValue) === true) {
        newList.push(item)
      }
      newList.splice(0, newList.length, ...(new Set(newList)))
    })
  } else if (item.classList.contains('appareil') === true) {
    const list = uniqueAppareils
    name = 'appareil'
    list.forEach(item => {
      const itemGood = item.toString().toLowerCase()
      if (itemGood.includes(inputValue) === true) {
        newList.push(item)
      }
      newList.splice(0, newList.length, ...(new Set(newList)))
    })
  } else if (item.classList.contains('ingredients') === true) {
    name = 'ingredients'
    list = uniqueIngredients
    list.forEach(item => {
      const itemGood = item.toString().toLowerCase()
      if (itemGood.includes(inputValue) === true) {
        newList.push(item)
      }
      newList.splice(0, newList.length, ...(new Set(newList)))
    })
  }
  console.log(newList)
  const recipesAfterSearch = []
  updateListeTag(recipesAfterSearch, newList, name)
}

// CLOSE THE DROPDOWN MENU
export function closeList (item) {
  const dropdown = document.querySelector('ul.' + item)
  const list = dropdown.querySelector('.list')
  list.classList.remove('open')
  dropdown.classList.remove('arrowOpen')
}
