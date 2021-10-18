import { recipes } from './recipes.js'

/**
 * Convert RECIPES IN STRING IN A NEW ARRAY
 */
export const newRecipes = []

recipes.forEach(item => {
  const newArray = Object.values(item)
  newRecipes.push(newArray)
})

let ingredient

newRecipes.forEach(recipe => {
  let nameId = recipe[0]
  nameId = []
  recipe[3].forEach(item => {
    ingredient = Object.values(item)
    ingredient.splice(1, 2)
    nameId.push(ingredient)
  })
  recipe[3] = nameId
})
