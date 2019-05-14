import AbstractView from './abstract-view';

export default class QuestionRadioView extends AbstractView {
  constructor({task, image, answers, topic}, number) {
    super();
    this._task = task;
    this._answers = answers;
    this._img = image ? `<img src=${image} class="question__img">` : ``;
    this._number = number;
    this._topic = topic;
  }

  get template() {
    return `
      <div class="question">
        <p class="question__topic">${this._topic}</p>
        <p class="question__number">Вопрос №${this._number}</p>
        <h1 class="question__text">${this._task}</h1>
        ${this._img}

        <form class="answers">
          <ul class="answers__list">
            ${this._answers.map((answer) => `<li class="answers__item">
              <input class="answers__input visually-hidden" name="answer" type="radio" name="answer[]" value="${answer.id}" id="answer-${answer.id}">
              <label class="answers__label answers__label--radio" for="answer-${answer.id}">${answer.text}</label>
            </li>`).join(``)}
          </ul>

          <button type="submit" class="answers__submit" disabled>Ответить</button>
        </form>
      </div>`;
  }

  bind() {
    const formEl = this._element.querySelector(`.answers`);
    const inputEls = Array.from(formEl.querySelectorAll(`.answers__input`));
    const submitEl = formEl.querySelector(`.answers__submit`);

    formEl.onchange = () => {
      submitEl.disabled = !inputEls.some((input) => input.checked);
    };

    formEl.onsubmit = (evt) => {
      evt.preventDefault();
      this.onFormSubmit(formEl.querySelector(`.answers__input:checked`).value);
    };
  }

  onFormSubmit() {}
}
