import AbstractView from './abstract-view';

export default class QuestionMatchingView extends AbstractView {
  constructor({task, answers}, number) {
    super();
    this._task = task;
    this._answers = answers;
    this._number = number;
  }

  get template() {
    return `
      <div class="question">
        <p class="question__number">Вопрос №${this._number}</p>
        <h1 class="question__text">${this._task}</h1>

        <form class="answers">
          <ul class="answers__list">
            ${this._answers.matching_list.map((item) => `<li class="answers__item answers__item--matching">
              <p class="question__text question__text--matching">${item.text}</p>
              <select name="matching-${item.id}" id="${item.id}" class="answers__select answers__select--unselect">
                <option value="0" hidden class="answers__option">Выберите</option>
                ${this._answers.matching_answers.map((answer) => `<option value="${answer.id}" class="answers__option">${answer.text}</option>`).join(``)}
              </select>
            </li>`).join(``)}
          </ul>

          <button type="submit" class="answers__submit" disabled>Ответить</button>
        </form>
      </div>`;
  }
  bind() {
    const formEl = this._element.querySelector(`.answers`);
    const selectsEls = Array.from(formEl.querySelectorAll(`.answers__select`));
    const submitEl = formEl.querySelector(`.answers__submit`);

    formEl.onchange = (evt) => {
      evt.target.classList.remove(`answers__select--unselect`);
      submitEl.disabled = !selectsEls.every((select) => !select.classList.contains(`answers__select--unselect`) && select.value !== `0`);
    };

    formEl.onsubmit = (evt) => {
      evt.preventDefault();
      const answerData = [];

      selectsEls.forEach((select) => {
        answerData.push([select.id, select.value]);
      });

      this.onFormSubmit(answerData);
    };
  }

  onFormSubmit() {}
}
