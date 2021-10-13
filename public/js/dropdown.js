import { recipes } from './recipes.js'
import { Dropdown } from './DropdownClass.js'

const listItemIds = []

const sectionFilter = document.getElementById('filter')

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

// DISPLAY DROPDOWN
export function displayDropdown () {
  dropdownArray.forEach(item => {
    const recipesTemplate = new Dropdown(item)
    sectionFilter.innerHTML += recipesTemplate.creatHtmlDropdown()
  })
}

// LISTE USTENCILES
function getUstensiles () {
  const ustensilsArray = []
  recipes.forEach(item => {
    const ustensils = item.ustensils
    ustensils.forEach(item => {
      ustensilsArray.push(item)
    })
  })
  const uniqueUstensils = [...new Set(ustensilsArray)]
  return uniqueUstensils
}

getUstensiles()

// LISTE APPAREIL
function getAppareils () {
  const appareilsArray = []
  recipes.forEach(item => {
    const appareils = item.appliance
    appareilsArray.push(appareils)
  })
  const uniqueAppareils = [...new Set(appareilsArray)]
  return uniqueAppareils
}

getAppareils()

// LISTE INGREDIENTS
function getIngredients () {
  const ingredientsArray = []
  recipes.forEach(item => {
    const ingredients = item.ingredients
    ingredients.forEach(item => {
      ingredientsArray.push(item.ingredient)
    })
  })
  const uniqueIngredients = [...new Set(ingredientsArray)]
  return uniqueIngredients
}

getIngredients()

// DISPLAY SELECTION ON SECTION TAG
function setSelectedListItem (event, name) {
  const selectedTextToAppend = document.createTextNode(event.target.innerText)

  const tagUl = document.querySelector('#tag ul')

  const newLi = document.createElement('li')
  tagUl.appendChild(newLi)
  newLi.classList.add(name)
  newLi.appendChild(selectedTextToAppend)
  newLi.innerHTML += '<i class="far fa-times-circle"></i>'
  const removeTag = document.querySelectorAll('#tag i')
  removeTag.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement
      parent.remove()
    })
  })
}

// // CLOSE THE DROPDOWN MENU
function closeList (item) {
  const dropdown = item.parentElement.parentElement.parentElement
  const list = dropdown.querySelector('.list')
  list.classList.remove('open')
  dropdown.classList.remove('arrowOpen')
}

// // FOCUS ON NEXT ELEMENT WITH ARROW
// function focusNextListItem (direction) {
//   const activeElementId = document.activeElement.id
//   const currentActiveElementIndex = listItemIds.indexOf(activeElementId)
//   if (direction === 'ArrowDown') {
//     const currentActiveElementIsNotLastItem =
//       currentActiveElementIndex < listItemIds.length - 1
//     if (currentActiveElementIsNotLastItem) {
//       const nextListItemId = listItemIds[currentActiveElementIndex + 1]
//       document.querySelector(`#${nextListItemId}`).focus()
//     }
//   } else if (direction === 'ArrowUp') {
//     const currentActiveElementIsNotFirstItem =
//     currentActiveElementIndex > 0
//     if (currentActiveElementIsNotFirstItem) {
//       const nextListItemId = listItemIds[currentActiveElementIndex - 1]
//       document.querySelector(`#${nextListItemId}`).focus()
//     }
//   }
// }

// OPEN DROPDOWN AND NEXT ACTION
function toggleListVisibility (item) {
  const dropdown = item.parentElement.parentElement
  const dropdownSelectedNode = item
  const list = dropdown.querySelector('.list')
  const listAll = document.querySelectorAll('.list')

  // Open the Dropdown Menu
  dropdown.classList.toggle('arrowOpen')
  listAll.forEach(item => {
    if (item.classList.contains('open') === true) {
      item.classList.remove('open')
      list.classList.add('open')
    } else if (item.classList.contains('open') === false) {
      list.classList.add('open')
    }
  })
  dropdownSelectedNode.addEventListener('keydown', (event) => {
    // CLose Dropdown if Escape
    if (event.key === 'Escape') {
      closeList(item)
    }
    // Go Down
    if (event.key === 'ArrowDown') {
      focusNextListItem('ArrowDown')
    }
    // Go Up
    if (event.key === 'ArrowUp') {
      focusNextListItem('ArrowUp')
    }
  })
}

export function dropdownSort () {
  const listItems = document.querySelectorAll('.list-item')
  const dropdownSelectedNode = document.querySelectorAll('#selected input')
  // CLICK OR ENTER ON THE BUTTON

  dropdownSelectedNode.forEach(item => {
    item.addEventListener('click', (event) => {
      if ((event.key === 'Enter') || (event.type === 'click')) {
        const name = item.value
        toggleListVisibility(item, name)
      }
    }, false)
  })

  // EVENT ON LIST ITEM
  listItems.forEach(item => listItemIds.push(item.id))

  listItems.forEach(item => {
    item.addEventListener('click', event => {
      if (item.classList.contains('ustensiles') === true) {
        const name = 'ustensiles'
        setSelectedListItem(event, name)
      } else if (item.classList.contains('appareil') === true) {
        const name = 'appareil'
        setSelectedListItem(event, name)
      } else if (item.classList.contains('ingredients') === true) {
        const name = 'ingredients'
        setSelectedListItem(event, name)
      }
      closeList(item)
    })
    item.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Enter':
          setSelectedListItem(event)
          closeList(item)
          return

        case 'ArrowDown':
          focusNextListItem('ArrowDown')
          return

        case 'ArrowUp':
          focusNextListItem('ArrowUp')
          return

        case 'Escape':
          closeList(item)
      }
    })
  })
}
