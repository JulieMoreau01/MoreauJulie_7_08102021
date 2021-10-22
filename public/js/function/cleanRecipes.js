import { recipes } from '../data/recipes.js'

/**
 * REMOVE OBJECT FROM RECIPES.JS
 */
export const cleanRecipes = []

recipes.forEach(item => {
  const newArray = Object.values(item)
  cleanRecipes.push(newArray)
})

let ingredient

cleanRecipes.forEach(recipe => {
  let nameId = recipe[0]
  nameId = []
  recipe[3].forEach(item => {
    ingredient = Object.values(item)
    ingredient.splice(1, 2)
    nameId.push(ingredient)
  })
  recipe[3] = nameId
})
