import EndView from './../views/end-view';

export default class WelcomePresenter {
  constructor({text, score, link}) {
    this._view = new EndView({text, score, link});
  }

  get element() {
    return this._view.element;
  }
}
