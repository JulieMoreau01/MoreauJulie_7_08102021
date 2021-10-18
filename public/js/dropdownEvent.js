// import { recipes } from './recipes.js'
// import { Dropdown } from './DropdownClass.js'
// import { getTagValue } from './index.js'
// import { displayDropdown } from './displayDropdown.js'
import { displayDropdown, uniqueUstensils, uniqueAppareils, uniqueIngredients } from './displayDropdown.js'
import { setSelectedListItem } from './creatTag.js'

function sortList (item, inputValue) {
  if (item.classList.contains('ustensiles') === true) {
    const list = uniqueUstensils
    console.log(list)
  } else if (item.classList.contains('appareil') === true) {
    const list = uniqueAppareils
    console.log(list)
  } else if (item.classList.contains('ingredients') === true) {
    const list = uniqueIngredients
    list.forEach(item => {
      console.log(item)
      const itemGood = item.toString().toLowerCase()
      if (itemGood.includes(inputValue) === true) {
        console.log('ok')
      } else {
        item.splice(item, 1)
      }
    })
  }
}

export function dropdownEvent () {
  displayDropdown()
  // OPEN DROPDOWN
  const dropdownInput = document.querySelectorAll('#selected input')

  function openDropDownMenu (item) {
    const dropdown = item.parentElement.parentElement
    dropdown.classList.toggle('arrowOpen')
    const listAll = document.querySelectorAll('.list')
    const list = dropdown.querySelector('.list')
    listAll.forEach(item => {
      if (item.classList.contains('open') === true) {
        list.classList.toggle('open')
        item.classList.remove('open')
      } else if (item.classList.contains('open') === false) {
        list.classList.toggle('open')
      }
    })
  }

  dropdownInput.forEach(item => {
    item.addEventListener('click', () => {
      openDropDownMenu(item)
    })
    item.addEventListener('keyup', () => {
      if (item.value.length < 3) {
        console.log('la')
      } else if (item.value.length > 2) {
        const inputValue = item.value.toLowerCase()
        sortList(item, inputValue)
      }
    })
  })

  // // CLOSE THE DROPDOWN MENU
  function closeList (item) {
    const dropdown = item.parentElement.parentElement.parentElement
    const list = dropdown.querySelector('.list')
    list.classList.remove('open')
    dropdown.classList.remove('arrowOpen')
  }

  const listItems = document.querySelectorAll('.list-item')
  listItems.forEach(item => {
    item.addEventListener('click', event => {
      if (item.classList.contains('ustensiles') === true) {
        const name = 'ustensiles'
        console.log('ustensiles')
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
        case 'Escape':
          closeList(item)
      }
    })
  })
}
