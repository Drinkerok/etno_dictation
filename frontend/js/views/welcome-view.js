import AbstractView from './abstract-view';

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="container">
        <div class="welcome">
          <div class="welcome__wrapper">
            <div class="decoration"></div>
            <div class="logo">
              <a href="http://miretno.ru/" class="logo__link" target="_blank">
                <svg class="logo__img" width="148" height="144" aria-label="Логотип" role="img">
                  <use xlink:href="#logo"/>
                </svg>
              </a>
              <p class="logo__text">Большой этнографический диктант</p>
            </div>

            <p class="welcome__text">Участниками Диктанта могут стать жители России и зарубежных стран, владеющие русским языком, независимо от образования, социальной принадлежности, вероисповедания и гражданства.
            </p>

            <button class="welcome__start">Пройти тестирование</button>
          </div>
        </div>
      </div>`;
  }

  bind() {
    const startEl = this._element.querySelector(`.welcome__start`);
    startEl.onclick = () => {
      startEl.disabled = true;
      startEl.textContent = `Загрузка...`;
      this.onStartTest();
    };
  }

  onStartTest() {}
}
