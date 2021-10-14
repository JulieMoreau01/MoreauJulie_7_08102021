import { recipes } from './recipes.js'

/**
 * Convert RECIPES ARRAY IN STRING
 */
export const newRecipes = []
recipes.forEach(item => {
  const newArray = Object.values(item)
  newArray.splice(2, 3)
  const newArrayString = newArray.toString().toLowerCase()
  newRecipes.push(newArrayString)
})

/**
 * Convert RECIPES INGREDIENTS ARRAY IN STRING
 */
export const newIngredients = []
let newArrayStringIng

recipes.forEach(item => {
  let name = item.id
  name = []
  const ingredients = item.ingredients
  ingredients.forEach(item => {
    const ingredient = item.ingredient
    name.push(ingredient)
    newArrayStringIng = name.toString().toLowerCase()
  })
  newIngredients.push(newArrayStringIng)
})
