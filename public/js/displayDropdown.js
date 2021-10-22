import { Dropdown } from './DropdownClass.js'
import { dropdownArray } from './updateListTag.js'

// DISPLAY DROPDOWN
export function displayDropdown () {
  const sectionFilter = document.getElementById('filter')
  sectionFilter.innerHTML = ''
  dropdownArray.forEach(item => {
    const recipesTemplate = new Dropdown(item)
    sectionFilter.innerHTML += recipesTemplate.creatHtmlDropdown()
  })
}

// DISPLAY LIST
export function displayList () {
  const ulContainer = document.querySelectorAll('section#filter ul.dropdown ul.list')
  let count = -1
  ulContainer.forEach(item => {
    count++
    let recipesTemplateName = item.getAttribute('class')
    recipesTemplateName = new Dropdown(dropdownArray[count])
    item.innerHTML = ''
    item.innerHTML += recipesTemplateName.creatHtmlList()
  })
}
