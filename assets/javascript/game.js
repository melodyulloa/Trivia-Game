
const gameQuestions =[{
    question:"Who is Goku's son?",
    choices:["Vegeta", "Gohan","Lord Beerus","Android 18"],
    correctAnswer:"Gohan"
},
{
  question:"What's Goku's wife's name?",
  choices:["Cinderella", "Chi-Chi","Cha-Chi","Bulma"],
  correctAnswer:"Chi-Chi"
},
{
    question:"What is the name of Universe 7's God of Destruction?",
  choices:["Android 17", "Lord Beerus","Lord Champa","Whis"],
  correctAnswer:"Lord Beerus"
},
{
    question:"Did Master Roshi train Goku and Krillin?",
  choices:["True","False"],
  correctAnswer:"True"
}
];

//variables
var counter = 15;
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var timer;
var score;

function nextQuestion() {
  const isQuestionOver = (gameQuestions.length - 1) === currentQuestion;
  if (isQuestionOver) {
      // TODO
      console.log('Game is over!!!!!');
      displayResult();
  } else {
      currentQuestion++;
      loadQuestion();
  }
  
}


function timeUp() {
  clearInterval(timer);

  incorrectAnswers++;
  setTimeout(nextQuestion, 2 * 1000);
}



//timer
function countDown(){
    counter--;

    $('#time').html('Timer: '+ counter);
    if(counter === 0){
      timeUp();
    }
}


//display question and answer
function loadQuestion(){
    counter=15;
    timer=setInterval(countDown,1000);
    const question = gameQuestions[currentQuestion].question;
    const choices = gameQuestions[currentQuestion].choices;
    $('#time').html('Timer: ' + counter);
    $('#dGame').html(`<h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);
    
}

function loadChoices(choices){
   var result= '';
   for (var i = 0; i < choices.length; i++){
       result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
   }
return result;
}

loadQuestion();


$(document).on('click', '.choice', function() {
  clearInterval(timer);
  const selectedAnswer = $(this).attr('data-answer');
  const correctAnswer = gameQuestions[currentQuestion].correctAnswer;

  if (correctAnswer === selectedAnswer) {
      score++;
      console.log('Winsss!!!!');
      setTimeout(nextQuestion, 2 * 1000);
  } else {
      incorrectAnswers++;
      console.log('Lost!!!!');
      setTimeout(nextQuestion, 2 * 1000);
  }
});

function displayResult() {
  const result = `
      <p>You get ${score} questions(s) right</p>
      <p>You missed ${incorrectAnswers} questions(s)</p>
      <p>Total questions ${gameQuestions.length} questions(s) right</p>
      <button class="btn btn-primary" id="reset">Reset Game</button>
  `;

  $('#game').html(result);
}

$(document).on('click', '#reset', function() {
  counter = 15;
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = 0;
  timer = null;

  loadQuestion();
});


function loadRemainingQuestion() {
  const remainingQuestion = gameQuestions.length - (currentQuestion + 1);
  const totalQuestion = gameQuestions.length;

  return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


function randomImage(images) {
  const random = Math.floor(Math.random() * images.length);
  const randomImage = images[random];
  return randomImage;
}


$('#start').click(function() {
  $('#start').remove();
  $('#time').html(counter);
  loadQuestion();
});