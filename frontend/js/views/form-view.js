import AbstractView from './abstract-view';

const HeaderText = {
  COMPLETE: `Вы завершили тест!`,
  FAIL_TIME: `Увы... Время вышло`,
  STOP: `Вы остановили выполнение теста`
};

export default class FormView extends AbstractView {
  constructor(status = `COMPLETE`) {
    super();
    this._headerText = HeaderText[status];
  }

  get template() {
    return `
      <div class="container">
        <div class="form">
          <p class="form__header">${this._headerText}</p>

          <form action="#" class="form__form">
            <p class="form__description">Для того, чтобы сохранить ваш результат, пожалуйста введите:</p>
            <div class="form__item">
              <label for="email" class="form__label visually-hidden">E-mail</label>
              <input class="form__input" type="email" id="email" name="email" placeholder="E-mail*" required autofocus />
            </div>
            <div class="form__item">
              <label for="surname" class="form__label visually-hidden">Фамилия</label>
              <input class="form__input" type="text" id="surname" name="last_name" placeholder="Фамилия*" required />
            </div>
            <div class="form__item">
              <label for="name" class="form__label visually-hidden">Имя</label>
              <input class="form__input" type="text" id="name" name="first_name" placeholder="Имя*" required />
            </div>
            <div class="form__item">
              <label for="middle-name" class="form__label visually-hidden">Отчество</label>
              <input class="form__input" type="text" id="middle-name" name="patronymic" placeholder="Отчество*" required />
            </div>

            <div class="form__item form__item--agreement">
              <input type="checkbox" class="form__checkbox" id="agreement" required />
              <label for="agreement" class="form__label">Нажимая на кнопку, вы даете согласие на обработку своих персональных данных и соглашаетесь с <a href="http://miretno.ru/privacy/" target="_blank">Политикой конфиденциальности</a></label>
            </div>

            <div class="form__submit-wrapper">
              <button class="form__submit" disabled>Сохранить результат</button>
            </div>
          </form>
        </div>
      </div>`;
  }

  bind() {
    const formEl = this._element.querySelector(`.form`);
    const inputEls = Array.from(formEl.querySelectorAll(`.form__input`));
    const submitEl = formEl.querySelector(`.form__submit`);
    const agreementEl = formEl.querySelector(`#agreement`);

    agreementEl.onchange = () => {
      submitEl.disabled = !inputEls.every((input) => input.value !== ``) || !agreementEl.checked;
    }

    formEl.oninput = (evt) => {
      const inputNode = evt.target;
      const wrapperEl = inputNode.closest(`.form__item`);
      if (wrapperEl) {
        wrapperEl.classList.remove(`form__item--error`);
      }
      submitEl.disabled = !inputEls.every((input) => input.value !== ``) || !agreementEl.checked;
    };

    formEl.onsubmit = (evt) => {
      evt.preventDefault();
      const formData = {};
      inputEls.forEach((input) => {
        formData[input.name] = input.value;
      });

      this.onFormSubmit(formData);
      this.changeSubmitText({
        text: `Отправка...`,
        disabled: true
      });
    };
  }

  changeSubmitText({text = `Сохранить результат`, disabled = true}) {
    const submitEl = this._element.querySelector(`.form__submit`);
    submitEl.textContent = text;
    submitEl.disabled = disabled;
  }

  onFormSubmit() {}

  setError({inputId, errors = []}) {
    const inputEl = this._element.querySelector(`#${inputId}`);
    if (!inputEl) return;
    const wrapperEl = inputEl.closest(`.form__item`);
    wrapperEl.classList.add(`form__item--error`);
    wrapperEl.setAttribute(`data-error`, errors.join(` `));
  }
}
