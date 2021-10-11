export class Recipes {
  constructor (item) {
    this.name = item.name
    this.time = item.time
    this.description = item.description

    // GET THE INGREDIENTS LIST
    const ingredientList = item.ingredients
    const ingredients = ingredientList.map((elt) => {
      const ingredient = elt.ingredient
      const quantity = elt.quantity
      const unit = elt.unit
      if ((quantity === undefined) && (unit === undefined)) {
        return `<li><span>${ingredient}</span></li>`
      } else if (quantity === undefined) {
        return `<li><span>${ingredient} :</span> ${unit}</li>`
      } else if (unit === undefined) {
        return `<li><span>${ingredient} :</span> ${quantity}</li>`
      } else {
        return `<li><span>${ingredient} :</span> ${quantity} ${unit}</li>`
      }
    }).join('')

    // Replace Too long unit width abreviation
    const searchGrammes = 'grammes'
    const searchGrammesWidth = 'g'
    const searchCuillere = 'cuillères à soupe'
    const searchCuillereWidth = 'cs'
    const searchCafe = 'cuillères à café'
    const searchCafeWidth = 'cc'
    this.ingredients = ingredients
      .split(searchGrammes).join(searchGrammesWidth)
      .split(searchCuillere).join(searchCuillereWidth)
      .split(searchCafe).join(searchCafeWidth)
  }

  // Template HTML
  creatHtmlRecipe () {
    return `
    <article>
      <figure><img src="public/images/recipes/limonade-de-coco.jpg" alt="limonade-de-coco" /></figure>
      <h2>${this.name}</h2>
      <p class="times"><i class="far fa-clock"></i> ${this.time} min</p>
      <ul>
        ${this.ingredients}
      </ul>
      <p class="recipe">${this.description}</p>
    </article>
    `
  }
}