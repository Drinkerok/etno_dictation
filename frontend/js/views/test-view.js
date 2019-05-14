import AbstractView from './abstract-view';

export default class TestView extends AbstractView {
  constructor(timer) {
    super();
    this._timer = timer;
    this._minutesRemains = ~~(this._timer.time / 60);
    this._secondsRemains = this._timer.time % 60;
    if (this._secondsRemains < 10) {
      this._secondsRemains = `0${this._secondsRemains}`;
    }
  }

  get template() {
    return `
      <div class="content">
        <div class="decoration"></div>
        <div class="container">
          <div class="test">
            <header class="page-header">
              <div class="logo">
                <a href="http://miretno.ru/" class="logo__link" target="_blank">
                  <svg class="logo__img" width="92" height="90" aria-hidden="true" role="presentation">
                    <use xlink:href="#logo"/>
                  </svg>
                </a>
                <p class="logo__text">Большой этнографический диктант</p>
              </div>

              <div class="timer">
                <svg class="timer__icon" width="77" height="90" aria-hidden="true" role="presentation">
                  <use xlink:href="#icon_timer"/>
                </svg>
                <p class="timer__header">До конца теста осталось:</p>
                <p class="timer__value">
                  <span class="timer__mins">${this._minutesRemains}</span>
                  :
                  <span class="timer__secs">${this._secondsRemains}</span>
                </p>
              </div>

              <button class="test__end">
                Завершить тестирование

                <svg class="test__end-icon" width="32" height="32" aria-hidden="true" role="presentation">
                  <use xlink:href="#icon_finish"/>
                </svg>
              </button>
            </header>

            <div class="test__content">
              <div class="test__navigation"></div>
              <div class="test__question"></div>
              <div class="test__controls">
                <button class="test__control">
                  Назад
                  <svg class="test__control-icon" width="16" height="16" aria-hidden="true" role="presentation">
                    <use xlink:href="#icon_arrow"/>
                  </svg>
                </button>
                <button class="test__control test__control--next">
                  Далее
                  <svg class="test__control-icon" width="16" height="16" aria-hidden="true" role="presentation">
                    <use xlink:href="#icon_arrow"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="popup">
          <div class="popup__content">
            <p class="popup__text">У вас остались вопросы без ответа. Завершить тестирование?</p>

            <div class="popup__controls">
              <button class="popup__control popup__control--confirm">Да</button>
              <button class="popup__control popup__control--reject">Нет</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  bind() {
    const minutesEl = this._element.querySelector(`.timer__mins`);
    const secondsEl = this._element.querySelector(`.timer__secs`);
    this._timer.ontick = () => {
      minutesEl.textContent = ~~(this._timer.time / 60);
      let secondsValue = this._timer.time % 60;
      if (secondsValue < 10) {
        secondsValue = `0${secondsValue}`;
      }
      secondsEl.textContent = secondsValue;
    };


    const controlPrevEl = this._element.querySelector(`.test__control`);
    const controlNextEl = this._element.querySelector(`.test__control.test__control--next`);

    controlPrevEl.onclick = () => {
      this.showPrevQuestion();
    };
    controlNextEl.onclick = () => {
      this.showNextQuestion();
    };


    const endEl = this._element.querySelector(`.test__end`);
    const popupEl = this._element.querySelector(`.popup`);
    const confirmEl = popupEl.querySelector(`.popup__control--confirm`);
    const rejectEl = popupEl.querySelector(`.popup__control--reject`);

    popupEl.addEventListener(`click`, (evt) => {
      if (evt.target !== popupEl) return;

      popupEl.classList.remove(`popup--show`);
    });
    endEl.onclick = () => {
      popupEl.classList.add(`popup--show`);
    };
    confirmEl.onclick = () => {
      this.exitTest();
    };
    rejectEl.onclick = () => {
      popupEl.classList.remove(`popup--show`);
    };
  }

  getQuestionContainer() {
    return this._element.querySelector(`.test__question`);
  }
  getNavContainer() {
    return this._element.querySelector(`.test__navigation`);
  }

  showPrevQuestion() {}
  showNextQuestion() {}
  exitTest() {}
}
