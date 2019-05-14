const TEST_TIME = 45 * 60;


export default class TestModel {
  constructor(questions, time) {
    this._questions = questions;
    this._state = {
      answers: {},
      time: time || TEST_TIME,
    };
  }

  setAnswer(answer, number) {
    const questionId = this._questions[number] ? this._questions[number].id : -1;
    this._state.answers[questionId] = answer;
  }

  getQuestion(number) {
    return this._questions[number];
  }

  isComplete() {
    return Object.keys(this._state.answers).length === this._questions.length;
  }

  getNextQuestion(number) {
    let i = number;
    while (i < this._questions.length) {
      if (!this._state.answers[this._questions[i].id]) {
        return i;
      }
      i++;
    }

    for (i = 0; i < number; i++) {
      if (!this._state.answers[this._questions[i].id]) {
        return i;
      }
    }

    return null;
  }
  getPrevQuestion(number) {
    for (let i = number; i >= 0; i--) {
      if (!this._state.answers[this._questions[i].id]) {
        return i;
      }
    }

    for (let i = this._questions.length - 1; i > number; i--) {
      if (!this._state.answers[this._questions[i].id]) {
        return i;
      }
    }

    return null;
  }


  set time(newTime) {
    this._state.time = newTime;
  }
  get time() {
    return this._state.time;
  }
  get answers() {
    const answers = [];
    for (let i = 0; i < this._questions.length; i++) {
      const questionId = this._questions[i].id;
      answers.push(this._state.answers[questionId] ? this._state.answers[questionId] : -1);
    }
    return answers;
  }
}
