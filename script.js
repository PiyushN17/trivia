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
let container2 = document.getElementById('container2');
let anotherCategory = document.getElementById('anotherCategory');
let end = document.getElementById('end');
let finalScore = document.getElementById('finalScore');
let finalWinner = document.getElementById('finalWinner');
let finalPlay1 = document.getElementById('finalPlay1');
let finalPlay2 = document.getElementById('finalPlay2');
let round = document.getElementById('round');
let opt1 = document.getElementById('opt1');
let opt2 = document.getElementById('opt2');
let opt3 = document.getElementById('opt3');
let opt4 = document.getElementById('opt4');


let i = 0;
let j = 0;
let turnCounter = 1;
let counter1 = 0;
let counter2 = 0;
let score = 0;
let respArray = [];
let shuffledOpt = [];
let nameArr = [];
let roundCounter = 0;

btn.addEventListener('click', function(event) {
  event.preventDefault();
  if(name1.value !== '' && name2.value !== '') {
    if(name1.value !== name2.value) {
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
      err.innerText = 'Error! Both Names cannot be same';
    }
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
    loader.hidden = true;
    container2.hidden = false;
    points.hidden = false;
    shuffledOpt = [respArray[i][j].correctAnswer, ...respArray[i][j].incorrectAnswers].sort(() => Math.random() - 0.5);
    turn.innerText = (turnCounter%2!==0 ? nameArr[0]:nameArr[1]) + "'s turn";
    round.innerText = `Round ${roundCounter + 1}`;
    question.innerText = 'Question: ' + respArray[i][j].question.text;
    diffLevel.innerText = 'Difficulty Level: ' + respArray[i][j].difficulty;
    firstOpt.innerText = shuffledOpt[0];
    secOpt.innerText = shuffledOpt[1];
    thirdOpt.innerText = shuffledOpt[2];
    fourthOpt.innerText = shuffledOpt[3];
}

let selectedCategory = '';
subBtn.addEventListener('click', function() {
  if(categoryList.value === '') {
    err2.innerText = 'Please select a category.';
  }
  else {
    selectedCategory  = categoryList.value;
    let disabledOptions = document.querySelector(`option[value="${selectedCategory}"]`);
    disabledOptions.disabled = true;
    disabledOptions.hidden = true;

    err2.innerText = '';
    container.hidden = true;
    loader.hidden = false;
    getQues(categoryList.value);
    categoryList.value = '';
  }
});
// ansSub.addEventListener('click', function() {
//   const selected = document.querySelector("input[name='answer']:checked");
//   if (!selected) {
//     subErr.innerText = "Please select an option!";
//     return;
//   }
//   score = 0;
//   if(shuffledOpt[selected.value] === respArray[i][j].correctAnswer) {
//     alert('Correct!');
//     subErr.innerText = "";
//     if(respArray[i][j].difficulty === 'easy') {
//       score = 10;
//     }
//     else if(respArray[i][j].difficulty === 'medium') {
//       score = 15;
//     }
//     else if(respArray[i][j].difficulty === 'hard') {
//       score = 20;
//     }
//     if(turnCounter%2 !== 0) {
//       counter1 += score;
//       p1Points.innerText = nameArr[0] + ': ' + counter1;
//     }
//     else {
//       counter2 += score;
//       p2Points.innerText = nameArr[1] + ': ' + counter2;
//     }
//   }
//   else {
//     alert('Wrong!');
//   }
//   if (j < respArray[i].length - 1) {
//     j++;
//   } 
//   else if (i < respArray.length - 1) {
//     i++;
//     j = 0;
//   } 
//   else {
//     container2.hidden = true;
//     points.hidden = true;
//     leaderboard.hidden = false;

//     winner.innerText = 'Category Complete';
//     play1.innerText = nameArr[0] + ': ' + counter1;
//     play2.innerText = nameArr[1] + ': ' + counter2;
//     i = 0;
//     j = 0;
//     respArray = [];
//     return;
//   }
//   selected.checked = false;
//   turnCounter++;
//   newQuestion();
// });


opt1.addEventListener('click', function() {
  score = 0;
  if(shuffledOpt[opt1.value] === respArray[i][j].correctAnswer) {
    firstOpt.style.color = 'green';
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;

    if(respArray[i][j].difficulty === 'easy') {
      score = 10;
    }
    else if(respArray[i][j].difficulty === 'medium') {
      score = 15;
    }
    else if(respArray[i][j].difficulty === 'hard') {
      score = 20;
    }
  }
  else {
    firstOpt.style.color = 'red';
    if (shuffledOpt[opt2.value] === respArray[i][j].correctAnswer) {
      secOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt3.value] === respArray[i][j].correctAnswer) {
      thirdOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt4.value] === respArray[i][j].correctAnswer) {
      fourthOpt.style.color = 'green';
    }
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;
  }

  if(turnCounter%2 !== 0) {
    counter1 += score;
    p1Points.innerText = nameArr[0] + ': ' + counter1;
  }
  else {
    counter2 += score;
    p2Points.innerText = nameArr[1] + ': ' + counter2;
  }
});

opt2.addEventListener('click', function() {
  score = 0;
  if(shuffledOpt[opt2.value] === respArray[i][j].correctAnswer) {
    secOpt.style.color = 'green';
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;

    if(respArray[i][j].difficulty === 'easy') {
      score = 10;
    }
    else if(respArray[i][j].difficulty === 'medium') {
      score = 15;
    }
    else if(respArray[i][j].difficulty === 'hard') {
      score = 20;
    }
  }
  else {
    secOpt.style.color = 'red';
    if (shuffledOpt[opt1.value] === respArray[i][j].correctAnswer) {
      firstOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt3.value] === respArray[i][j].correctAnswer) {
      thirdOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt4.value] === respArray[i][j].correctAnswer) {
      fourthOpt.style.color = 'green';
    }
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;
  }

  if(turnCounter%2 !== 0) {
    counter1 += score;
    p1Points.innerText = nameArr[0] + ': ' + counter1;
  }
  else {
    counter2 += score;
    p2Points.innerText = nameArr[1] + ': ' + counter2;
  }
});

opt3.addEventListener('click', function() {
  score = 0;
  if(shuffledOpt[opt3.value] === respArray[i][j].correctAnswer) {
    thirdOpt.style.color = 'green';
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;

    if(respArray[i][j].difficulty === 'easy') {
      score = 10;
    }
    else if(respArray[i][j].difficulty === 'medium') {
      score = 15;
    }
    else if(respArray[i][j].difficulty === 'hard') {
      score = 20;
    }
  }
  else {
    thirdOpt.style.color = 'red';
    if (shuffledOpt[opt1.value] === respArray[i][j].correctAnswer) {
      firstOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt2.value] === respArray[i][j].correctAnswer) {
      secOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt4.value] === respArray[i][j].correctAnswer) {
      fourthOpt.style.color = 'green';
    }
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;
  }

  if(turnCounter%2 !== 0) {
    counter1 += score;
    p1Points.innerText = nameArr[0] + ': ' + counter1;
  }
  else {
    counter2 += score;
    p2Points.innerText = nameArr[1] + ': ' + counter2;
  }
});

opt4.addEventListener('click', function() {
  score = 0;
  if(shuffledOpt[opt4.value] === respArray[i][j].correctAnswer) {
    fourthOpt.style.color = 'green';
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;

    if(respArray[i][j].difficulty === 'easy') {
      score = 10;
    }
    else if(respArray[i][j].difficulty === 'medium') {
      score = 15;
    }
    else if(respArray[i][j].difficulty === 'hard') {
      score = 20;
    }
  }
  else {
    fourthOpt.style.color = 'red';
    if (shuffledOpt[opt1.value] === respArray[i][j].correctAnswer) {
      firstOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt2.value] === respArray[i][j].correctAnswer) {
      secOpt.style.color = 'green';
    }
    else if (shuffledOpt[opt3.value] === respArray[i][j].correctAnswer) {
      thirdOpt.style.color = 'green';
    }
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;
  }

  if(turnCounter%2 !== 0) {
    counter1 += score;
    p1Points.innerText = nameArr[0] + ': ' + counter1;
  }
  else {
    counter2 += score;
    p2Points.innerText = nameArr[1] + ': ' + counter2;
  }
});

ansSub.addEventListener('click', function() {
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

    winner.innerText = 'Category Complete';
    play1.innerText = nameArr[0] + ': ' + counter1;
    play2.innerText = nameArr[1] + ': ' + counter2;
    i = 0;
    j = 0;
    respArray = [];
    return;
  }


  let selected = document.querySelector("input[name='answer']:checked");
  selected.checked = false;
  turnCounter++;
  firstOpt.style.color = 'black';
  secOpt.style.color = 'black';
  thirdOpt.style.color = 'black';
  fourthOpt.style.color = 'black';
  opt1.disabled = false;
  opt2.disabled = false;
  opt3.disabled = false;
  opt4.disabled = false;
  ansSub.disabled = true;
  newQuestion();
})

anotherCategory.addEventListener('click', function() {
  let selected = document.querySelector("input[name='answer']:checked");
  roundCounter++;
  leaderboard.hidden = true;
  container.hidden = false;
  firstOpt.style.color = 'black';
  secOpt.style.color = 'black';
  thirdOpt.style.color = 'black';
  fourthOpt.style.color = 'black';
  opt1.disabled = false;
  opt2.disabled = false;
  opt3.disabled = false;
  opt4.disabled = false;
  selected.checked = false;
});

end.addEventListener('click', function() {
  finalScore.hidden = false;
  leaderboard.hidden = true;
  if(counter1 > counter2) {
    finalWinner.innerText = nameArr[0] + ' Won!!!';
    finalPlay1.innerText = '1. ' + nameArr[0] + ': ' + counter1;
    finalPlay2.innerText = '2. ' + nameArr[1] + ': ' + counter2;
    i = 0;
    j = 0;
    respArray = [];
  }
  else if(counter1 === counter2) {
    finalWinner.innerText = "It's a tie!";
    finalPlay1.innerText = nameArr[0] + ': ' + counter1;
    finalPlay2.innerText = nameArr[1] + ': ' + counter2;
    i = 0;
    j = 0;
    respArray = [];
  }
  else {
    finalWinner.innerText = nameArr[1] + ' Won!!!';
    finalPlay1.innerText = '1. ' + nameArr[1] + ': ' + counter2;
    finalPlay2.innerText = '2. ' + nameArr[0] + ': ' + counter1;
    i = 0;
    j = 0;
    respArray = [];
  }
});
