import { recipes } from './recipes.js'

/**
 * REMOVE OBJECTS FROM RECIPES.JS
 */
export const cleanRecipes = []
export const cleanRecipesTag = []

recipes.forEach(item => {
  const newArray = Object.values(item)
  cleanRecipes.push(newArray)
  cleanRecipesTag.push(newArray)
})

// Add Array ingredient in cleanRecipes
cleanRecipes.forEach(recipe => {
  let ingredient
  let nameId = recipe[0]
  nameId = []
  recipe[3].forEach(item => {
    ingredient = Object.values(item)
    ingredient.splice(1, 2)
    nameId.push(ingredient)
  })
  recipe[3] = nameId
})

// Add Array ingredient in cleanRecipesTag
cleanRecipesTag.forEach(recipe => {
  let ingredientTag
  let nameId = recipe[0]
  nameId = []
  recipe[3].forEach(item => {
    ingredientTag = Object.values(item)
    ingredientTag.splice(1, 2)
    nameId.push(ingredientTag)
  })
  recipe[3] = nameId
})
