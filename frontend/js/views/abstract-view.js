export default class AbstractView {
  constructor() {
    // if (new.target === AbstractView) {
    //   throw new Error(`Can't instantiate AbstractView, only concrete one`);
    // }
  }


  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }

    return this._element;
  }

  bind() {}

  render() {
    const elem = document.createElement(`div`);
    elem.innerHTML = this.template;

    return elem.firstElementChild;
  }
}
