import adaptServerData from './../adapters/questions';

const SERVER_URL = `json/questions_server.json`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (res) => res.json();


export default class Loader {
  static loadQuestions() {
    const requestSettings = {
      method: `GET`
    };

    return fetch(SERVER_URL, requestSettings)
            .then(checkStatus)
            .then(toJSON)
            .then((data) => adaptServerData(data));
  }

  static sendAnswers(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${SERVER_URL}/getResult`, requestSettings)
      .then(checkStatus)
      .then(toJSON);
  }
}
