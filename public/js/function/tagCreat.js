import { displaySearchRecipesTag } from './displayRecipes.js'
import { removeRecipeFromArray } from './removeRecipes.js'

/**
 * DISPLAY TAG
 */
export function creatTag (event, listName, recipesAfterSearch) {
  const selectedTextToAppend = document.createTextNode(event.target.innerText)

  // Creat Tag
  const tagUl = document.querySelector('#tag ul')
  const newLi = document.createElement('li')
  tagUl.appendChild(newLi)
  newLi.classList.add(listName)
  newLi.appendChild(selectedTextToAppend)
  newLi.innerHTML += '<i class="far fa-times-circle"></i>'

  // Send the tag value
  const tagValue = selectedTextToAppend.data.toLowerCase()
  displaySearchRecipesTag(tagValue, recipesAfterSearch)

  // Remove Tag
  const removeTag = document.querySelectorAll('#tag i')
  removeTag.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement
      parent.remove()
      removeRecipeFromArray()
    })
  })
}
