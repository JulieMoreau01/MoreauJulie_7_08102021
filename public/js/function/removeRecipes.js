import { displaySearchRecipesTag, displaySearchRecipesInput } from './displayRecipes.js'

const sectionRecipes = document.getElementById('recipes')
const input = document.querySelector('input')

export function removeRecipeFromArray (removeValue, recipesAfterSearch) {
  const tag = document.querySelectorAll('section#tag ul li')
  const inputValue = input.value.toLowerCase()
  sectionRecipes.innerHTML = ''
  // NO Input & TAG
  if (inputValue === '') {
    if (tag.length !== 0) {
      displaySearchRecipesInput(inputValue, recipesAfterSearch = [])
      tag.forEach(item => {
        const tagValue = item.textContent.toLowerCase()
        displaySearchRecipesTag(tagValue, recipesAfterSearch)
      })
    }
  } else {
    // Input & No TAG
    if (tag.length === 0) {
      displaySearchRecipesInput(inputValue, recipesAfterSearch = [])
    // Input & TAG
    } else {
      displaySearchRecipesInput(inputValue, recipesAfterSearch = [])
      tag.forEach(item => {
        const tagValue = item.textContent.toLowerCase()
        displaySearchRecipesTag(tagValue, recipesAfterSearch)
      })
    }
  }
}
