import {changeScreen} from './utils';
import WelcomePresenter from './../presenters/welcome-presenter';
import TestPresenter from './../presenters/test-presenter';
import FormPresenter from './../presenters/form-presenter';
import EndPresenter from './../presenters/end-presenter';


import Loader from './loader';
import TestModel from './../models/test-model';

let questions = [];


export default class Application {
  static showWelcome() {
    const welcome = new WelcomePresenter();
    changeScreen(welcome.element);
  }

  static startTest() {
    Loader.loadQuestions()
      .then(({questionsData, timeData}) => {
        questions = questionsData;
        return timeData;
      })
      .then((time) => {
        const model = new TestModel(questions, time);
        const test = new TestPresenter(model);
        test.start();
      })
      .catch((err) => {
        alert(`${err}
          Попробуйте ещё раз!`);
        this.showWelcome();
      });
  }

  static showForm({answers, status}) {
    const form = new FormPresenter({answers, status});
    changeScreen(form.element);
  }

  static showEnd({text, score, link}) {
    const end = new EndPresenter({text, score, link});
    changeScreen(end.element);
  }
}
