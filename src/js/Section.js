class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  render() {
    this.items.forEach(this.addItem);
  }

  addItem(item) {
    const itemElement = this.renderer(item);
    this.container.appendChild(itemElement);
  }
}
