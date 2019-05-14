import App from './../components/application';
import {changeScreen} from './../components/utils';
import getTimer from './../components/timer';

import TestView from './../views/test-view';
import NavView from './../views/navigation-view';
import QuestionCheckboxView from './../views/question-checkbox-view';
import QuestionRadioView from './../views/question-radio-view';
import QuestionTextareaView from './../views/question-textarea-view';
import QuestionMatchingView from './../views/question-matching-view';

const TIMER_TICK_PERIOD = 1000;

function questionCheckbox({question, number, context}) {
  const questionPage = new QuestionCheckboxView(question, number + 1);
  questionPage.onFormSubmit = (answers) => {
    context._model.setAnswer(answers, context._questionNumber);

    context._questionNumber = context._model.getNextQuestion(context._questionNumber + 1);

    context.showQuestion();
    context._navView.setCompleteItem(number);
  };

  return questionPage;
}
function questionRadio({question, number, context}) {
  const questionPage = new QuestionRadioView(question, number + 1);
  questionPage.onFormSubmit = (answer) => {
    context._model.setAnswer(answer, context._questionNumber);

    context._questionNumber = context._model.getNextQuestion(context._questionNumber + 1);

    context.showQuestion();
    context._navView.setCompleteItem(number);
  };

  return questionPage;
}
function questionText({question, number, context}) {
  const questionPage = new QuestionTextareaView(question, number + 1);
  questionPage.onFormSubmit = (answer) => {
    context._model.setAnswer(answer, context._questionNumber);

    context._questionNumber = context._model.getNextQuestion(context._questionNumber + 1);

    context.showQuestion();
    context._navView.setCompleteItem(number);
  };

  return questionPage;
}
function questionMatching({question, number, context}) {
  const questionPage = new QuestionMatchingView(question, number + 1);
  questionPage.onFormSubmit = (answersData) => {
    context._model.setAnswer(answersData, context._questionNumber);

    context._questionNumber = context._model.getNextQuestion(context._questionNumber + 1);

    context.showQuestion();
    context._navView.setCompleteItem(number);
  };

  return questionPage;
}
const QuestionType = {
  checkbox: questionCheckbox,
  radio: questionRadio,
  text: questionText,
  matching: questionMatching
};


export default class TestPresenter {
  constructor(model) {
    this._model = model;
    this._timer = getTimer(this._model.time);
    this._questionNumber = 0;
  }

  start() {
    this._view = new TestView(this._timer);
    this._initNav();

    changeScreen(this._view.element);
    changeScreen(this._navView.element, this._view.getNavContainer());

    this.startTimer();


    this.showQuestion();

    this._view.showPrevQuestion = () => {
      this._questionNumber = this._model.getPrevQuestion(this._questionNumber - 1);
      this.showQuestion();
    };
    this._view.showNextQuestion = () => {
      this._questionNumber = this._model.getNextQuestion(this._questionNumber + 1);
      this.showQuestion();
    };

    this._view.exitTest = () => {
      this.stopTimer();
      this.showForm(`STOP`);
    };
  }

  startTimer() {
    this._timerId = setTimeout(() => {
      const {done} = this._timer.tick();
      this._model.time = this._timer.time;
      if (done) {
        this.stopTimer();
        this.showForm(`FAIL_TIME`);
      }
      this.startTimer();
    }, TIMER_TICK_PERIOD);
  }
  stopTimer() {
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
  }


  _initNav() {
    this._navView = new NavView(this._model._questions);
    this._navView.onNavClick = (number) => {
      this._questionNumber = number;
      this.showQuestion();
    };
  }


  showQuestion(number = this._questionNumber) {
    const question = this._model.getQuestion(number);


    if (question) {
      const questionPage = QuestionType[question.type]({question, number, context: this});

      this._navView.setActiveItem(number);
      changeScreen(questionPage.element, this._view.getQuestionContainer());
    } else {
      if (this._model.isComplete()) {
        this.stopTimer();
        this.showForm(`COMPLETE`);
      } else {
        this._questionNumber = this._model.getNextQuestion();
        this.showQuestion();
      }
    }
  }


  showForm(status) {
    App.showForm({
      answers: this._model.answers,
      status
    });
  }
}
