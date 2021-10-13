export class Dropdown {
  constructor (item) {
    this.name = item.name
    // this.list = item.list
    const theList = item.list
    const listLi = theList.map((elt) => {
      return `<li class="list-item activePop ${this.name}" id="option-1" role="option">${elt}</li>`
    }).join('')
    this.listLi = listLi
  }

  // Template HTML
  creatHtmlDropdown () {
    return `
    <ul class="dropdown ${this.name}">
    <li id="selected">
      <input aria-haspopup="true" aria-label="Trier par ${this.name}" value="${this.name}" placeholder="Rechercher un ${this.name}" />
    </li>
    <li aria-expanded="false" class="list-container ${this.name}">
      <ul class="list" role="listbox">
          ${this.listLi}
      </ul>
    </li>
  </ul>
  `
  }
}