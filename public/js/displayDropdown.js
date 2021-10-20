import { Dropdown } from './DropdownClass.js'
import { dropdownArray } from './listGeneration.js'

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
  const ulIngredients = document.querySelector('section#filter ul#ingredients')
  const recipesTemplateIngredient = new Dropdown(dropdownArray[0])
  ulIngredients.innerHTML = ''
  ulIngredients.innerHTML += recipesTemplateIngredient.creatHtmlList()
  const ulUstensiles = document.querySelector('section#filter ul#ustensiles')
  const recipesTemplateUstensiles = new Dropdown(dropdownArray[1])
  ulUstensiles.innerHTML = ''
  ulUstensiles.innerHTML += recipesTemplateUstensiles.creatHtmlList()
  const ulAppareil = document.querySelector('section#filter ul#appareil')
  const recipesTemplate = new Dropdown(dropdownArray[2])
  ulAppareil.innerHTML = ''
  ulAppareil.innerHTML += recipesTemplate.creatHtmlList()
}
