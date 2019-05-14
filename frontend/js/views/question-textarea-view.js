import AbstractView from './abstract-view';

export default class QuestionTextareaView extends AbstractView {
  constructor({task}, number) {
    super();
    this._task = task;
    this._number = number;
  }

  get template() {
    return `
      <div class="question">
        <p class="question__number">Вопрос №${this._number}</p>
        <h1 class="question__text">${this._task}</h1>

        <form class="answers">
          <textarea name="answer" class="answers__textarea" placeholder="Ваш ответ"></textarea>

          <button type="submit" class="answers__submit" disabled>Ответить</button>
        </form>
      </div>`;
  }

  bind() {
    const formEl = this._element.querySelector(`.answers`);
    const textareaEl = formEl.querySelector(`.answers__textarea`);
    const submitEl = formEl.querySelector(`.answers__submit`);

    textareaEl.oninput = () => {
      submitEl.disabled = textareaEl.value === ``;
    };

    formEl.onsubmit = (evt) => {
      evt.preventDefault();
      this.onFormSubmit(textareaEl.value);
    };
  }

  onFormSubmit() {}
}
