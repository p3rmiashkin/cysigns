let currentQuestion = 0;

function setElementText(elementId, text) {
  return document.getElementById(elementId).innerText = text;
}

function toggleModifier(elementId, modifier, force) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle(modifier, force);
  }
}

function hideSpacers(hide) {
  var elements = document.getElementsByClassName('spacer');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('d-hide', hide);
  }
}

function showAnswer() {
  toggleModifier('answerText', 'd-invisible', false);
}

function updateScore() {
  setElementText('question', currentQuestion);
}

function proceed() {
  return currentQuestion < signs.length;
}

function getRandomQuestion() {
  let availableQuestions = signs.filter(question => !question.used);
  if (availableQuestions.length === 0) {
    signs.forEach(question => question.used = false);
    availableQuestions = signs;
  }
  let randomIndex = Math.floor(Math.random() * availableQuestions.length);
  let question = availableQuestions[randomIndex];
  question.used = true;
  return question;
}

function assignAnswer(element, answer) {
  element.innerText = answer.name;
  element.name = answer.name;
  element.ru = answer.ru;
}

function showQuestion() {
  const question = getRandomQuestion();
  let image = document.getElementById('signImage');
  image.src = question.image;

  toggleModifier('answerText', 'd-invisible', true);
  assignAnswer(document.getElementById('answerText'), question);

  updateTranslation();
}

function nextQuestion() {
  setElementText('nextButton', proceed() ? 'Next' : 'Restart');
  toggleModifier('finishText', 'd-hide', proceed());
  if (proceed()) {
    currentQuestion++;
    updateScore();
    showQuestion();
  } else {
    resetState();
  }
}

function resetState() {
  currentQuestion = 0;
  signs.forEach(question => question.used = false);
}

function switchMode() {
  // Simplified - no mode switching in simple version
  const dialog = document.getElementById('modeSwitchDialog');
  dialog.close();
}

function updateTranslation() {
  let ru = document.getElementById('lang').checked;
  let answerText = document.getElementById('answerText');
  answerText.innerText = ru ? answerText.ru : answerText.name;
}

function preloadImages() {
  toggleModifier('signContainer', 'loading', true);
  window.onload = function() {
    toggleModifier('signContainer', 'loading', false);
  };
  for (let i = 0; i < signs.length; i++) {
    let image = new Image();
    image.src = signs[i].image;
  }
}

setElementText('total', signs.length);
preloadImages();
nextQuestion();
