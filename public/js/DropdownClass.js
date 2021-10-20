export class Dropdown {
  constructor (item) {
    this.name = item.name
    const theList = item.list
    const listLi = theList.map((elt) => {
      return `<li class="list-item activePop ${this.name}" role="option">${elt}</li>`
    }).join('')
    this.listLi = listLi
  }

  // Template HTML
  creatHtmlDropdown () {
    return `
    <ul class="dropdown ${this.name}">
    <li id="selected">
      <input aria-haspopup="true" aria-label="Trier par ${this.name}" placeholder="${this.name}" class="${this.name}" />
    </li>
    <li aria-expanded="false" class="list-container ${this.name}">
      <ul class="list" role="listbox" id="${this.name}">
      </ul>
    </li>
  </ul>
  `
  }

  creatHtmlList () {
    return `
    ${this.listLi}
    `
  }
}
