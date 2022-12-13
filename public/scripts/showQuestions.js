let timer = 1;
let answerTimerInSeconds = 30;
let isAnswerCorrect = false;
let round = 1;
let currentPoints = 0; 

let clue;

// // set css timeCountdown:
var root = document.querySelector(':root');
let seconds = timer + 's';
var timeCountdown = root.style.setProperty('--timeCountdown', seconds);
// get css timeCountdown:
var rootStyles = getComputedStyle(root);
var timeCountdown= rootStyles.getPropertyValue('--timeCountdown');
console.log("timeCountdown", timeCountdown);

let questionsFinished = 59;


// rename 'first', 'second', etc. og refac.!:
// row 1
let cells =  document.querySelectorAll('.first th');    
for (var i = 0; i < cells.length; i++) {
 cells[i].onclick = function () {  clickRow1( this.getAttribute("value")); };
};
async function clickRow1(i) {

 clue = await loadQuestion(0, (parseInt(i) + ((round - 1) * 6  )));

 showQuestionPopup();
};

// row 2
let cells2 = document.querySelectorAll('.second th');
for (var i = 0; i < cells2.length; i++) {
 cells2[i].onclick = function () { clickRow2(this.getAttribute("value")); };
};
async function clickRow2(i) {
  clue = await loadQuestion(1, (parseInt(i) + ((round - 1) * 6)) );
 showQuestionPopup();
};

// row 3
let cells3 = document.querySelectorAll('.third th');
for (var i = 0; i < cells3.length; i++) {
 cells3[i].onclick = function () { clickRow3(this.getAttribute("value")); };
};
async function clickRow3(i) {
  clue = await loadQuestion(2, (parseInt(i) + ((round - 1) * 6)) );
 showQuestionPopup();
};

// row 4
let cells4 = document.querySelectorAll('.forth th');
for (var i = 0; i < cells4.length; i++) {
 cells4[i].onclick = function () { clickRow4(this.getAttribute("value")); };
};
async function clickRow4(i) {
  clue = await loadQuestion(3, (parseInt(i) + ((round - 1) * 6)) );
 showQuestionPopup();
};

// row 5
let cells5 = document.querySelectorAll('.fifth th');
for (var i = 0; i < cells5.length; i++) {
 cells5[i].onclick = function () { clickRow5(this.getAttribute("value")); };
};
async function clickRow5(i) {
  clue = await loadQuestion(4, (parseInt(i) + ((round - 1) * 6)) );
 showQuestionPopup();
};

async function loadQuestion(value, categori) {

  console.log(categori);

    currentPoints = (value + 1) * (round * 100);

    let categorieIDs = [];
    categorieIDs.push(sessionStorage.getItem("cat1"));
    categorieIDs.push(sessionStorage.getItem("cat2"));
    categorieIDs.push(sessionStorage.getItem("cat3"));
    categorieIDs.push(sessionStorage.getItem("cat4"));
    categorieIDs.push(sessionStorage.getItem("cat5"));
    categorieIDs.push(sessionStorage.getItem("cat6"));
    categorieIDs.push(sessionStorage.getItem("cat7"));
    categorieIDs.push(sessionStorage.getItem("cat8"));
    categorieIDs.push(sessionStorage.getItem("cat9"));
    categorieIDs.push(sessionStorage.getItem("cat10"));
    categorieIDs.push(sessionStorage.getItem("cat11"));
    categorieIDs.push(sessionStorage.getItem("cat12"));
    

    sessionStorage.setItem("activeCategory", categori - 1);
    sessionStorage.setItem("activeQuestion", (value + 1));

    let apiPath = `https://jservice.io/api/clues?category=${categorieIDs[categori - 1]}`;

    const response = await fetch(apiPath);
    const data = await response.json();
    // console.log(data[value]);
    return data[value];
};
// console.log(document.querySelectorAll('.first th'));

// ------------------------------ QUESTION POPUP ------------------------------------
let startQuestionTimer;
function showQuestionPopup() {

 document.getElementById("backQuestion").classList.add("hide");
 document.getElementById("question_popup_H2").innerHTML = "Spørgsmål";
 document.getElementById("thecard").classList.remove("flipcard");

 var popup = document.getElementById("Question_popup");
 popup.classList.add("question-open-popup");

 var popup = document.getElementById("fadeQuestion_popup_background");
 popup.classList.add("fade");

 document.getElementById("question_popup_H2").innerHTML += " til " + currentPoints;
 document.getElementById("question_popup_H2").innerHTML += "<h3>" + clue.question + "</h3>";

 startQuestionTimer = window.setInterval(inputTimer, 1000);
};

let startAnswerTimer;
function flipCardDelay(){
 document.getElementById("backQuestion").classList.remove("hide");
 document.getElementById("thecard").classList.add("flipcard");
 // bagside=?:
 // startQuestionTimer = window.setInterval(inputTimer, RESPONCE_TIME_IN_MILLISECONDS);
 document.getElementById("frontQuestion").classList.add("hide")
 document.getElementById("question_popup_H2_Back").innerHTML = "Spørgsmål"
 document.getElementById("answerButton").classList.remove("hide");
 document.getElementById("answerInput").readOnly = false;
 document.getElementById("answerInput").value = "";
 answerResponce.innerText = "";

 startAnswerTimer = window.setInterval(answerTimer, 1000);

 document.getElementById("continueButton").classList.add("hide");
 document.getElementById("itWasRightButton").classList.add("hide");
 document.getElementById("question_popup_H2_Back").innerHTML += " til " + currentPoints;
 document.getElementById("question_popup_H2_Back").innerHTML += "<h3>" + clue.question + "</h3>";
 
};

function closeQuestionPopup() {
 var popup = document.getElementById("Question_popup");
 popup.classList.remove("question-open-popup");
 var popup = document.getElementById("fadeQuestion_popup_background");
 popup.classList.remove("fade");

 document.getElementById("frontQuestion").classList.remove("hide")
};
// --------------------------------------------------------------------------------

// ------------------------------ TIMER -------------------------------------------
function inputTimer(){

 let numberTimeout = document.getElementById("numberTimeout");
 let textTimeout = document.getElementById("textTimeout");
 numberTimeout.classList.add("numberTimeout");
 textTimeout.classList.add("textTimeout");
 // timeleft bruges ikke?:
 // timeleft = RESPONCE_TIME_IN_MILLISECONDS;
 numberTimeout.innerHTML = timer + " sekunder...";
 if (timer <= 0) {
  clearTimeout(startQuestionTimer);
  console.log("tiden er udløbet og der må svares...");
  activateBuzzers();
  numberTimeout.innerHTML = "DER MÅ NU BUZZES !!!";
 };
 timer = timer - 1;
};


function answerTimer(){
document.getElementById("countdownAnswer").innerHTML = answerTimerInSeconds;
 if (answerTimerInSeconds <= 0) {
  clearTimeout(startAnswerTimer);
  // TODO: Giv besked og luk question popup:
  window.alert("Tiden løb ud");
 };
 answerTimerInSeconds = answerTimerInSeconds - 1;
};
//------------------------------ ACTIVATE BUZZERS & SOUND ------------------------------------------------
let firstToBuzz = "";
function activateBuzzers(){

 document.onkeydown = function (e) {
 document.getElementById("firstToBuzzH2").innerHTML = "";
 
 let key1 = sessionStorage.getItem("buzzer1Label");
 let key2 = sessionStorage.getItem("buzzer2Label");
 let key3 = sessionStorage.getItem("buzzer3Label");
 let key4 = sessionStorage.getItem("buzzer4Label");

 console.log(e.key);

 console.log(key1);

 if (e.key !== key1 && e.key !== key2 && e.key !== key3 && e.key !== key4) {
   return;
 };

 if (firstToBuzz == "" && e.key == key1) {
  firstToBuzz = e.key;
  console.log(sessionStorage.getItem("player1"), "var først!");
  playBuzzer();
  document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player1") + " var først!";
  window.setTimeout(flipCardDelay, 1000);
  sessionStorage.setItem("playerAnswering", sessionStorage.getItem("player1"));
  
 };
  
 if (firstToBuzz == "" && e.key == key2) {
  firstToBuzz = e.key;
  console.log(sessionStorage.getItem("player2"), "var først!");
  playBuzzer();
  document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player2") + " var først!";
  window.setTimeout(flipCardDelay, 1000);
  sessionStorage.setItem("playerAnswering", sessionStorage.getItem("player2"));
 };

 if (firstToBuzz == "" && e.key == key3) {
  firstToBuzz = e.key;
  console.log(sessionStorage.getItem("player3"), "var først!");
  playBuzzer();
  document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player3") + " var først!";
  window.setTimeout(flipCardDelay, 1000);
  sessionStorage.setItem("playerAnswering", sessionStorage.getItem("player3"));
 };

 if (firstToBuzz == "" && e.key == key4) {
  firstToBuzz = e.key;
  console.log(sessionStorage.getItem("player4"), "var først!");
  playBuzzer();
  document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player4") + " var først!";
  window.setTimeout(flipCardDelay, 1000);
  sessionStorage.setItem("playerAnswering", sessionStorage.getItem("player4"));
 };
 };
};

function playBuzzer() {
 var audio = new Audio("../sounds/buzz2.wav");
 audio.play();
};

//--------------------------------------------------------------------------------------------------------

//------------SVAR KNAP CLICK OG VALIDERING---------------------------------------------------------------
document.getElementById("answerButton").onclick = function () { 

 document.getElementById("answerButton").classList.add("hide");
 document.getElementById("answerInput").readOnly = true;

 let answerText = document.getElementById("answerInput").value;
 let answerResponce = document.getElementById("answerResponce");

 if (checkAnswer(answerText)) {
  answerResponce.innerText = "Tillykke du svarede rigtigt!"; 
  document.getElementById("continueButton").classList.remove("hide");
  document.getElementById("continueButton").classList.add("knap");

  isAnswerCorrect = true;
   
 } else {
  answerResponce.innerText = "Det rigtige svar er: " + clue.answer; 
  document.getElementById("continueButton").classList.remove("hide");
  document.getElementById("continueButton").classList.add("knap");
  document.getElementById("itWasRightButton").classList.remove("hide");
  document.getElementById("itWasRightButton").classList.add("knap");

  isAnswerCorrect = false;
 };
 window.isAnswerCorrect = isAnswerCorrect;
 window.currentPoints = currentPoints;
};

document.getElementById("continueButton").onclick = function () {
 closePopUpAndContinueGame();
};

document.getElementById("itWasRightButton").onclick = function () {
 window.isAnswerCorrect = true;
 closePopUpAndContinueGame();
};

function closePopUpAndContinueGame() {
  
 document.getElementById("firstToBuzzH2").innerHTML = "";
 document.getElementById("numberTimeout").innerHTML = "";
 document.getElementById("frontQuestion").classList.remove("hide");

 firstToBuzz = "";
 document.onkeydown = null;

 adjustScore();
 removeQuestion();
 closeQuestionPopup();

  questionsFinished += 1;

  console.log(questionsFinished);

  if (questionsFinished == 30) {
    startRoundTwo();
  };

  if (questionsFinished == 60) {
    gameEnd();
  }


};

   


function checkAnswer(answer) {
 return (answer.toUpperCase() == clue.answer.toUpperCase());
};

function adjustScore() {
  const players = getPlayers();
  const playerAnswering = sessionStorage.getItem("playerAnswering");
  let player;
  let newPlayerScore;

  if (playerAnswering) {
    player = players.find(player => player.name === playerAnswering);
  };

  console.log("adjustScore: ", sessionStorage.getItem("pointsPlayer" + player.id));
  sessionStorage.getItem("pointsPlayer" + player.id);

  if (window.isAnswerCorrect) {
    const currentPlayerScore = parseInt(sessionStorage.getItem("pointsPlayer" + player.id));
    newPlayerScore = currentPlayerScore + window.currentPoints;
    sessionStorage.setItem("pointsPlayer" + player.id, newPlayerScore.toString());
  } else {
    const currentPlayerScore = parseInt(sessionStorage.getItem("pointsPlayer" + player.id));
    newPlayerScore = currentPlayerScore - window.currentPoints;
    sessionStorage.setItem("pointsPlayer" + player.id, newPlayerScore.toString());
  };
  player.score = newPlayerScore;
  document.querySelector(`#card${player.id} > div.points > p`).innerHTML = player.score;
};


function removeQuestion() {
 
  if (sessionStorage.getItem("activeQuestion") == 1) {
    sessionStorage.setItem("activeQuestion", "first" + round);
  } 

  if (sessionStorage.getItem("activeQuestion") == 2) {
    sessionStorage.setItem("activeQuestion", "second" + round);
  } 

  if (sessionStorage.getItem("activeQuestion") == 3) {
    sessionStorage.setItem("activeQuestion", "third" + round);
  } 

  if (sessionStorage.getItem("activeQuestion") == 4) {
    sessionStorage.setItem("activeQuestion", "fourth" + round);
  }  

  if (sessionStorage.getItem("activeQuestion") == 5) {
    sessionStorage.setItem("activeQuestion", "fifth" + round);
  } 

  console.log("knap skal fjernes");
  console.log(sessionStorage.getItem("activeCategory"), sessionStorage.getItem("activeQuestion"));

  // console.log(document.getElementsByClassName("first").getElementByTagName('th')[0]);

  console.log(document.getElementById(sessionStorage.getItem("activeQuestion")).getElementsByTagName('th')[sessionStorage.getItem("activeCategory") - ((round - 1 ) * 6) ]);

  let cell = document.getElementById(sessionStorage.getItem("activeQuestion")).getElementsByTagName('th')[sessionStorage.getItem("activeCategory") - ((round - 1) * 6) ];

  console.log(cell);

  cell.classList.add("removedCell");
};


function startRoundTwo() {
  round = 2;

  document.getElementById("firstTable").classList.add("hide");
  document.getElementById("secondTable").classList.remove("hide");
  document.getElementById("secondTable").classList.add("theTableOne");
  document.getElementById("startingRoundTwo").classList.add("open-popup");
  document.getElementById("fadeBackground").classList.add("fade");

}


function gameEnd() {

  document.getElementById("gameFinished").classList.add("open-popup");

  document.getElementById("winnerName").innerHTML = findWinner();

}

function findWinner() {
  
  const players = getPlayers();

  let scores = [];

  for (let i = 0; i < players.length; i++) {

    scores.push(parseInt(sessionStorage.getItem("pointsPlayer" + players[i].id)));
    
  }

  let highest = scores[0];
  let highestIndex = 0;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > highest ) {
      highestIndex = i;
      highest = scores[i];
    }

    return players[highestIndex].name;

  }


}



//--------------------------------------------------------------------------------------------------------