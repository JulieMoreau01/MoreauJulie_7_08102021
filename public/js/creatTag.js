import { displaySearchRecipesTag, removeRecipeFromArray } from './index.js'

// DISPLAY SELECTION ON SECTION TAG
export function setSelectedListItem (event, name) {
  const selectedTextToAppend = document.createTextNode(event.target.innerText)

  // Creat Tag
  const tagUl = document.querySelector('#tag ul')
  const newLi = document.createElement('li')
  tagUl.appendChild(newLi)
  newLi.classList.add(name)
  newLi.appendChild(selectedTextToAppend)
  newLi.innerHTML += '<i class="far fa-times-circle"></i>'

  // Add tag in array tagValue
  const tagValue = selectedTextToAppend.data.toLowerCase()
  displaySearchRecipesTag(tagValue)

  // Remove Tag
  const removeTag = document.querySelectorAll('#tag i')
  removeTag.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement
      parent.remove()
      const value = parent.firstChild.data
      const removeValue = value.toString().toLowerCase()
      removeRecipeFromArray(removeValue)
    })
  })
}
