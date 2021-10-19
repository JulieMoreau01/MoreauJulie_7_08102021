import { displayDropdown, uniqueUstensils, uniqueAppareils, uniqueIngredients } from './displayDropdown.js'
import { setSelectedListItem } from './creatTag.js'

function sortList (item, inputValue) {
  let list
  if (item.classList.contains('ustensiles') === true) {
    const list = uniqueUstensils
    console.log(list)
  } else if (item.classList.contains('appareil') === true) {
    const list = uniqueAppareils
    console.log(list)
  } else if (item.classList.contains('ingredients') === true) {
    list = uniqueIngredients
    console.log(list)
    list.forEach(item => {
      console.log(item)
      const itemGood = item.toString().toLowerCase()
      if (itemGood.includes(inputValue) === true) {
        console.log('ok')
      } else {
        console.log('pas ok')
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
      const inputValue = item.value.toLowerCase()
      sortList(item, inputValue)
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
        setSelectedListItem(event, name)
        closeList(item)
      } else if (item.classList.contains('appareil') === true) {
        const name = 'appareil'
        setSelectedListItem(event, name)
        closeList(item)
      } else if (item.classList.contains('ingredients') === true) {
        const name = 'ingredients'
        setSelectedListItem(event, name)
        closeList(item)
      }
      closeList(item)
    })
  })
}
