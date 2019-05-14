import AbstractView from './abstract-view';
import {wordsDeclension} from './../components/utils';


export default class EndView extends AbstractView {
  constructor({text, score, link}) {
    super();
    this._text = text;
    this._score = score;
    this._link = link;
  }

  get template() {
    return `
      <div class="container">
        <div class="end">
          <div class="end__wrapper">
            <div class="decoration"></div>
            <div class="logo">
              <a href="http://miretno.ru/" class="logo__link" target="_blank">
                <svg class="logo__img" width="148" height="144" aria-label="Логотип" role="img">
                  <use xlink:href="#logo"/>
                </svg>
              </a>
            </div>

            <p class="end__header">${this._text}</p>

            <p class="end__score">Вы набрали ${this._score} ${wordsDeclension(this._score, [`балл`, `балла`, `баллов`])} из 100.</p>

            <div class="end__certificate-wrapper">
              <a href="${this._link.output}" class="end__certificate" target="_blank">Скачать сертификат участника</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  bind() {
    const certificateEl = this._element.querySelector(`.end__certificate`);
    certificateEl.onclick = () => {};
  }
}
