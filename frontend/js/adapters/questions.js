const QuestionTypeNumberToText = {
  1: `radio`,
  2: `checkbox`,
  3: `matching`,
  4: `text`
};


export default (data) => {
  const responseData = data.response;
  const questionsData = responseData.question_list;
  const timeData = responseData.time;
  const topicsData = responseData.topics;

  const myQuestions = [];
  questionsData.forEach((item) => {
    myQuestions.push({
      id: item.id,
      type: QuestionTypeNumberToText[item.type],
      task: item.question,
      image: item.image,
      answers: item.answer_list,
      topic: `Тема ${item.topic}. ${topicsData[item.topic]}`
    });
  });


  return {
    questionsData: myQuestions,
    timeData
  };
};
