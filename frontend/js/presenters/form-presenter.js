import FormView from './../views/form-view';
import App from './../components/application';
import Loader from './../components/loader';

export default class FormPresenter {
  constructor({answers, status}) {
    this._view = new FormView(status);


    this._view.onFormSubmit = (formData) => {
      formData.answers = answers;
      Loader.sendAnswers(formData)
        .then((response) => {
          const responseData = response.response;
          if (responseData.status === `success`) {
            try {
              window.yaCounter50957903.reachGoal('SAVE_RESULT')
            }
            catch (ex) {
            }
            App.showEnd({
              text: responseData.message,
              score: responseData.total_points,
              link: responseData.link_certificate
            });
          } else {
            // const errArray = [];
            for (let err in responseData.errors) {
              if ({}.hasOwnProperty.call(responseData.errors, err)) {
                this._view.setError({
                  inputId: err,
                  errors: responseData.errors[err]
                });
              }
            }
            this._view.changeSubmitText({
              text: `Сохранить результат`,
              disabled: true
            });
            // alert(`${errArray.map((err) => `${err}.
            //   `).join(``)}`);
          }
        })
        .catch((err) => {
          alert(`${err}... Попробуйте ещё раз!`);
        })
        .finally(this._view.changeSubmitText({
          text: `Сохранить результат`,
          disabled: false
        }));
    };
  }

  get element() {
    return this._view.element;
  }
}
