import WelcomeView from './../views/welcome-view';
import App from './../components/application';

export default class WelcomePresenter {
  constructor() {
    this._view = new WelcomeView();
    this._view.onStartTest = () => {
      App.startTest();
    };
  }

  get element() {
    return this._view.element;
  }
}
