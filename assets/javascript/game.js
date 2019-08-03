//$(document).ready(function){}
function startGame(btn){
  btn.style.display ="none";
  counter = 10; 
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  score = 0;
  loadQuestion();
  document.getElementById("container").style.display="block";
  
}

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
let counter;
let currentQuestion;
let correctAnswers;
let incorrectAnswers;
let timer;
let score;

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
  document.getElementById("feedback").innerHTML = "Incorrect Answer!";
  document.getElementById("correctAns").innerHTML = gameQuestions[currentQuestion].correctAnswer;
  document.getElementById("feedback-box").style.display = "block";
  hideElement("dGame");
  setTimeout(function(){
    hideElement("feedback-box");
    // setTimeout(nextQuestion, 2 * 1000);
    nextQuestion();
    showElement("dGame");
  }, 3000);
  
}



//timer
function countDown(){
    counter--;

    $('#time').html('Timer: '+ counter);
    console.log(counter);
    if(counter <= 0){
      console.log("counter === 0");
      timeUp();
    }
}


//display question and answer
function loadQuestion(){
    counter=10;
    timer=setInterval(countDown,1000);
    const question = gameQuestions[currentQuestion].question;
    const choices = gameQuestions[currentQuestion].choices;
    $('#time').html('Timer: ' + counter);
    $('#dGame').html(`<h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);
}

function hideElement(id){
  document.getElementById(id).style.display ="none";
}

function showElement(id){
  document.getElementById(id).style.display ="block";
}

function loadChoices(choices){
   var result= '';
   for (var i = 0; i < choices.length; i++){
       result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
   }
return result;
}




$(document).on('click', '.choice', function() {
  clearInterval(timer);
  const selectedAnswer = $(this).attr('data-answer');
  const correctAnswer = gameQuestions[currentQuestion].correctAnswer;

  if (correctAnswer === selectedAnswer) {


    console.log(gameQuestions[currentQuestion].correctAnswer);
    document.getElementById("feedback").innerHTML = "You are Correct!!";
    document.getElementById("correctAns-wrap").style.display = "none";
    document.getElementById("feedback-box").style.display = "block";
    console.log("you are correct");
    hideElement("dGame");
    setTimeout(function(){
      hideElement("feedback-box");
      // setTimeout(nextQuestion, 2 * 1000);
      nextQuestion();
      showElement("dGame");
    }, 3000);



      score++;
      console.log('Winsss!!!!');
  } else {
      incorrectAnswers++;
      // console.log('Lost!!!!');
      // setTimeout(nextQuestion, 2 * 1000);
      
      document.getElementById("feedback").innerHTML = "Incorrect Answer!";
      console.log("you are incorrect");
      document.getElementById("correctAns-wrap").style.display = "block";
      document.getElementById("correctAns").innerHTML = gameQuestions[currentQuestion].correctAnswer;
      document.getElementById("feedback-box").style.display = "block";
      hideElement("dGame");
      setTimeout(function(){
        hideElement("feedback-box");
        // setTimeout(nextQuestion, 2 * 1000);
        nextQuestion();
        showElement("dGame");
      }, 3000);

      
  }
});

function displayResult() {
  const result = `
      <p>You get ${score} question(s) right</p>
      <p>You missed ${incorrectAnswers} question(s)</p>
      <p>Total questions ${gameQuestions.length} </p>
      <button class="btn btn-primary" id="reset" onclick="startGame(this)">Reset Game</button>
  `;
   
  $('#dGame').html(result);
}




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


