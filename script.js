const easyLevel = 'easy';
const medLevel = 'medium';
const hardLevel = 'hard';

let name1 = document.getElementById('name1');
let name2 = document.getElementById('name2');
let btn = document.getElementById('submit');
let form = document.getElementById('name');
let err = document.getElementById('err');
let err2 = document.getElementById('err2');
let container = document.getElementById('container');
let subBtn = document.getElementById('submitBtn');
let categoryList = document.getElementById('category');
let loader = document.getElementById('loader');
let question = document.getElementById('question');
let diffLevel = document.getElementById('diffLevel');
let turn = document.getElementById('turn');
let allOpt = document.getElementById('allOpt');
let firstOpt = document.getElementById('firstOpt');
let secOpt = document.getElementById('secOpt');
let thirdOpt = document.getElementById('thirdOpt');
let fourthOpt = document.getElementById('fourthOpt');
let ansSub = document.getElementById('ansSub');
let subErr = document.getElementById('subErr');
let points = document.getElementById('points');
let p1Points = document.getElementById('p1Points');
let p2Points = document.getElementById('p2Points');
let leaderboard = document.getElementById('leaderboard');
let play1 = document.getElementById('play1');
let play2 = document.getElementById('play2');
let winner = document.getElementById('winner');

let i = 0;
let j = 0;
let turnCounter = 1;
let counter1 = 0;
let counter2 = 0;
let score = 0;
const respArray = [];
let shuffledOpt = [];
const nameArr = [];

btn.addEventListener('click', function(event) {
  event.preventDefault();
  if(name1.value !== '' && name2.value !== '') {
    nameArr.push(name1.value);
    p1Points.innerText = name1.value + ': 0';
    nameArr.push(name2.value);
    p2Points.innerText = name2.value + ': 0';
    name1.value = '';
    err.innerText = '';
    name2.value = '';
    form.hidden = true;
    container.hidden = false;
  }
  else {
    err.innerText = 'Error! Enter Required Fields';
  }
});

async function getQues(category) {
  try {
    const easyOutput = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${easyLevel}&limit=2`;
    const medOut = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${medLevel}&limit=2`;
    const hardOut = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${hardLevel}&limit=2`;

    const output = await Promise.all([fetch(easyOutput), fetch(medOut), fetch(hardOut)]);
    for(let out of output) {
      const final = await out.json();
      respArray.push(final);
    }
    newQuestion();
  }
  catch(e) {
    err2.innerText = e.message;
  }
}

function newQuestion() {
    shuffledOpt = [respArray[i][j].correctAnswer, ...respArray[i][j].incorrectAnswers].sort(() => Math.random() - 0.5);
    turn.innerText = (turnCounter%2!==0 ? nameArr[0]:nameArr[1]) + "'s turn";
    question.innerText = 'Question: ' + respArray[i][j].question.text;
    diffLevel.innerText = 'Difficulty Level: ' + respArray[i][j].difficulty;
    firstOpt.innerText = shuffledOpt[0];
    secOpt.innerText = shuffledOpt[1];
    thirdOpt.innerText = shuffledOpt[2];
    fourthOpt.innerText = shuffledOpt[3];
}

subBtn.addEventListener('click', function() {
  if(categoryList.value === '') {
    err2.innerText = 'Please select a category.';
  }
  else {
    points.hidden = false;
    err2.innerText = '';
    container.hidden = true;
    container2.hidden = false;
    getQues(categoryList.value);
  }
});
ansSub.addEventListener('click', function() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    subErr.innerText = "Please select an option!";
    return;
  }
  if(shuffledOpt[selected.value] === respArray[i][j].correctAnswer) {
    subErr.innerText = "";
    if(respArray[i][j].difficulty === 'easy') {
      score = 10;
    }
    else if(respArray[i][j].difficulty === 'medium') {
      score = 15
    }
    else if(respArray[i][j].difficulty === 'hard') {
      score = 20
    }
    if(turnCounter%2 !== 0) {
      counter1 += score;
      p1Points.innerText = nameArr[0] + ': ' + counter1;
    }
    else {
      counter2 += score;
      p2Points.innerText = nameArr[1] + ': ' + counter2;
    }
  }
  if (j < respArray[i].length - 1) {
    j++;
  } 
  else if (i < respArray.length - 1) {
    i++;
    j = 0;
  } 
  else {
    container2.hidden = true;
    points.hidden = true;
    leaderboard.hidden = false;
    if(counter1 > counter2) {
      winner.innerText = nameArr[0] + ' Won!!!';
      play1.innerText = '1. ' + p1Points.innerText;
      play2.innerText = '2. ' + p2Points.innerText;
    }
    else if(counter1 === counter2) {
      winner.innerText = "It's a tie!";
      play1.innerText = '1. ' + p1Points.innerText;
      play2.innerText = '2. ' + p2Points.innerText;
    }
    else {
      winner.innerText = nameArr[1] + ' Won!!!';
      play1.innerText = '1. ' + p2Points.innerText;
      play2.innerText = '2. ' + p1Points.innerText;
    }
    return;
  }
  selected.checked = false;
  turnCounter++;
  newQuestion();
});
