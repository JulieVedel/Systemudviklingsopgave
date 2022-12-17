const BUZZER_TIMER_COUNTDOWN = 1;
let timer = BUZZER_TIMER_COUNTDOWN;
const ANSWER_TIMER_COUNTDOWN = 30;
let answerTimerInSeconds = ANSWER_TIMER_COUNTDOWN;
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

let questionsFinished = 0;


// rename 'first', 'second', etc. og refac.!:
// row 1

//TODO: TILFØJ TRY CATCH TIL ALLE DE HER:
let cells =  document.querySelectorAll('.first th');    
for (var i = 0; i < cells.length; i++) {
 cells[i].onclick = function () {  clickRow1( this.getAttribute("value")); };
};
async function clickRow1(i) {
 try {
  clue = await loadQuestion(0, (parseInt(i) + ((round - 1) * 6  )));
  showQuestionPopup();
 } catch (error) {
 }
};

// row 2
let cells2 = document.querySelectorAll('.second th');
for (var i = 0; i < cells2.length; i++) {
 cells2[i].onclick = function () { clickRow2(this.getAttribute("value")); };
};
async function clickRow2(i) {
 try {
  clue = await loadQuestion(1, (parseInt(i) + ((round - 1) * 6)) );
  showQuestionPopup();
 } catch (error) {
 };
};

// row 3
let cells3 = document.querySelectorAll('.third th');
for (var i = 0; i < cells3.length; i++) {
 cells3[i].onclick = function () { clickRow3(this.getAttribute("value")); };
};
async function clickRow3(i) {
 try {
  clue = await loadQuestion(2, (parseInt(i) + ((round - 1) * 6)) );
  showQuestionPopup();
 } catch (error) {
 };
};

// row 4
let cells4 = document.querySelectorAll('.forth th');
for (var i = 0; i < cells4.length; i++) {
 cells4[i].onclick = function () { clickRow4(this.getAttribute("value")); };
};
async function clickRow4(i) {
 try {
  clue = await loadQuestion(3, (parseInt(i) + ((round - 1) * 6)) );
  showQuestionPopup();
 } catch (error) {
 };
};

// row 5
let cells5 = document.querySelectorAll('.fifth th');
for (var i = 0; i < cells5.length; i++) {
 cells5[i].onclick = function () { clickRow5(this.getAttribute("value")); };
};
async function clickRow5(i) {
 try {
  clue = await loadQuestion(4, (parseInt(i) + ((round - 1) * 6)) );
  showQuestionPopup();
 } catch (error) {
 };
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
    try {
     const response = await fetch(apiPath);
     const data = await response.json();
     return data[value];
    } catch(e) {
     console.log(e);
     // Tilføj await?!?!!??!:
     // loadQuestion();
    };
    
};

// ------------------------------ QUESTION POPUP ------------------------------------
let startQuestionTimer;
function showQuestionPopup() {
 // TEST:
 clearTimeout(startAnswerTimer);
 timer = BUZZER_TIMER_COUNTDOWN;
 window.clearInterval(answerTimer, 1000);
 clearTimeout(startAnswerTimer);
 answerTimerInSeconds = ANSWER_TIMER_COUNTDOWN;

 document.getElementById("skipButton").classList.add("hide");
 document.getElementById("skipButton").classList.remove("knap");


 document.getElementById("OKButtonSkip").classList.add("hide");

 document.getElementById("answerInput").classList.remove("hide");
 document.getElementById("itWasRightButton").classList.remove("hide");

 document.getElementById("backQuestion").classList.add("hide");
 document.getElementById("question_popup_H2").innerHTML = "Spørgsmål";
 document.getElementById("thecard").classList.remove("flipcard");

 var popup = document.getElementById("Question_popup");
 popup.classList.add("question-open-popup");

 var popup = document.getElementById("fadeQuestion_popup_background");
 popup.classList.add("fade");

 document.getElementById("question_popup_H2").innerHTML += " til " + currentPoints;
 //Fix forkerte character fra API:
 clue.question = clue.question.replace(/\â\\/g, "'");

 document.getElementById("question_popup_H2").innerHTML += "<h3>" + clue.question + "</h3>";

 startQuestionTimer = window.setInterval(inputTimer, 1000);
};

let startAnswerTimer;
function flipCardDelay(){
 document.getElementById("backQuestion").classList.remove("hide");
 document.getElementById("thecard").classList.add("flipcard");
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

 document.getElementById("frontQuestion").classList.remove("hide");

 timer = BUZZER_TIMER_COUNTDOWN;

 document.getElementById("numberTimeout").classList.remove("numberTimeout");
 document.getElementById("textTimeout").classList.remove("textTimeout");

};

function skipQuestion(){
 console.log("skip!");
 flipCardDelay();
 let answerText = document.getElementById("answerResponce")
 answerText.classList.remove("hide");

 //Fix forkerte character fra API:
 clue.answer = clue.answer.replace(/\â\\/g, "'");
 
 answerText.innerHTML = clue.answer;

 let answerButton = document.getElementById("answerButton");
 answerButton.classList.add("hide");
 
 document.getElementById("answerInput").classList.add("hide");
 document.getElementById("itWasRightButton").classList.add("hide");

 let OKButtonSkip = document.getElementById("OKButtonSkip");
 OKButtonSkip.classList.remove("hide");

 let countdownAnswer = document.getElementById("countdownAnswer");
 countdownAnswer.classList.add("hide");

};

function OKButtonSkip(){
  document.getElementById("firstToBuzzH2").innerHTML = "";
  document.getElementById("numberTimeout").innerHTML = "";
  document.getElementById("frontQuestion").classList.remove("hide");
  firstToBuzz = "";
  document.onkeydown = null;
  removeQuestion();
  closeQuestionPopup();
   questionsFinished += 1;
   console.log(questionsFinished);
   if (questionsFinished == 30) {
     startRoundTwo();
   };
   if (questionsFinished == 60) {
     gameEnd();
   };

   // TEST:
   clearTimeout(startAnswerTimer);
   timer = BUZZER_TIMER_COUNTDOWN;
   window.clearInterval(answerTimer, 1000);
   clearTimeout(startAnswerTimer);
   answerTimerInSeconds = ANSWER_TIMER_COUNTDOWN;

}
// --------------------------------------------------------------------------------

// ------------------------------ TIMER -------------------------------------------
function inputTimer(){

 let numberTimeout = document.getElementById("numberTimeout");
 let textTimeout = document.getElementById("textTimeout");
 numberTimeout.classList.add("numberTimeout");
 textTimeout.classList.add("textTimeout");
 numberTimeout.innerHTML = timer + " sekunder...";
 if (timer <= 0) {
  clearTimeout(startQuestionTimer);
  console.log("tiden er udløbet og der må svares...");
  activateBuzzers();
  numberTimeout.innerHTML = "DER MÅ NU BUZZES !!!";

  document.getElementById("skipButton").classList.remove("hide");
  document.getElementById("skipButton").classList.add("knap");

 };
 timer = timer - 1;
};



 function answerTimer(){

 if (!document.getElementById("countdownAnswer").classList.contains("hide")) {
  document.getElementById("countdownAnswer").innerHTML = answerTimerInSeconds;
 };

 if (answerTimerInSeconds <= 0) {
   clearTimeout(startAnswerTimer);
   // TODO: Giv besked og luk question popup:
  // window.alert("Tiden løb ud");
  console.log("time is over");

    isAnswerCorrect = false;

    window.clearInterval(answerTimer, 1000);
    clearTimeout(startAnswerTimer);
    answerTimerInSeconds = 30;

    document.getElementById("countdownAnswer").innerHTML = "";
    document.getElementById("answerButton").classList.add("hide");
    document.getElementById("answerInput").classList.add("hide");

    answerResponce.innerText = "Tiden løb ud, det rigtige svar er: " + clue.answer; 
    document.getElementById("continueButton").classList.remove("hide");
    document.getElementById("continueButton").classList.add("knap");

    window.isAnswerCorrect = isAnswerCorrect;
    window.currentPoints = currentPoints;

    document.getElementById("continueButton").onclick = function () {
      closePopUpAndContinueGame();
    };

  };
  answerTimerInSeconds = answerTimerInSeconds - 1;
 };


//------------------------------ ACTIVATE BUZZERS & SOUND ------------------------------------------------
let firstToBuzz = "";
let playerWhoBussedFirst = -1;
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
   playerWhoBussedFirst = 0;
 };
  
 if (firstToBuzz == "" && e.key == key2) {
  firstToBuzz = e.key;
  console.log(sessionStorage.getItem("player2"), "var først!");
  playBuzzer();
  document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player2") + " var først!";
  window.setTimeout(flipCardDelay, 1000);
  sessionStorage.setItem("playerAnswering", sessionStorage.getItem("player2"));
   playerWhoBussedFirst = 1;
 };

 if (firstToBuzz == "" && e.key == key3) {
  firstToBuzz = e.key;
  console.log(sessionStorage.getItem("player3"), "var først!");
  playBuzzer();
  document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player3") + " var først!";
  window.setTimeout(flipCardDelay, 1000);
  sessionStorage.setItem("playerAnswering", sessionStorage.getItem("player3"));
   playerWhoBussedFirst = 2;
 };

 if (firstToBuzz == "" && e.key == key4) {
  firstToBuzz = e.key;
  console.log(sessionStorage.getItem("player4"), "var først!");
  playBuzzer();
  document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player4") + " var først!";
  window.setTimeout(flipCardDelay, 1000);
  sessionStorage.setItem("playerAnswering", sessionStorage.getItem("player4"));
   playerWhoBussedFirst = 3;
 };
 };
};

function playBuzzer() {
 var audio = new Audio("../sounds/buzz2.wav");
 audio.play();
};

//--------------------------------------------------------------------------------------------------------

//------------SVAR KNAP CLICK OG VALIDERING---------------------------------------------------------------
function answerButton() {
// document.getElementById("answerButton").onclick = function () { 
 clearTimeout(startAnswerTimer);
 document.getElementById("countdownAnswer").innerHTML = "";

 document.getElementById("answerButton").classList.add("hide");
 document.getElementById("answerInput").readOnly = true;

 let answerText = document.getElementById("answerInput").value;
 let answerResponce = document.getElementById("answerResponce");


  window.clearInterval(answerTimer, 1000);
  clearTimeout(startAnswerTimer);
  answerTimerInSeconds = 30;



 if (checkAnswer(answerText)) {
  answerResponce.innerText = "Tillykke du svarede rigtigt!"; 
  document.getElementById("continueButton").classList.remove("hide");
  document.getElementById("continueButton").classList.add("knap");

  isAnswerCorrect = true;

  playerWhoAnsweredRightGetsToPick();
   
 } else {
  answerResponce.innerText = "Det rigtige svar er: " + clue.answer; 
  document.getElementById("continueButton").classList.remove("hide");
  document.getElementById("continueButton").classList.add("knap");
  document.getElementById("itWasRightButton").classList.remove("hide");
  document.getElementById("itWasRightButton").classList.add("knap");

  isAnswerCorrect = false;

   newPlyaerPickQuestionIfAnswerIsWrong();




 };
 window.isAnswerCorrect = isAnswerCorrect;
 window.currentPoints = currentPoints;


document.getElementById("continueButton").onclick = function () {
 closePopUpAndContinueGame();
};

document.getElementById("itWasRightButton").onclick = function () {
  window.isAnswerCorrect = true;
  playerWhoAnsweredRightGetsToPick();
  closePopUpAndContinueGame();
};

};

function closePopUpAndContinueGame() {
  
 document.getElementById("firstToBuzzH2").innerHTML = "";
 document.getElementById("numberTimeout").innerHTML = "";
 document.getElementById("frontQuestion").classList.remove("hide");
  document.getElementById("answerInput").classList.remove("hide");

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



function newPlyaerPickQuestionIfAnswerIsWrong() {

  let cards = [];

  cards[0] = document.getElementById("card1");
  cards[1] = document.getElementById("card2");
  cards[2] = document.getElementById("card3");
  cards[3] = document.getElementById("card4");

  let currentPlayersTurn = parseInt(sessionStorage.getItem("currentPlayersTurn"));

  let totalPlayers = getPlayerNames().length;

  if ((currentPlayersTurn + 1) == totalPlayers) {
    currentPlayersTurn = 0;
  } else {
    currentPlayersTurn += 1;
  }

  for (let i = 0; i < totalPlayers; i++) {
     cards[i].classList.remove("card-selected");
  }

  console.log(currentPlayersTurn);

  cards[currentPlayersTurn].classList.add("card-selected");

  sessionStorage.setItem("currentPlayersTurn" , currentPlayersTurn);

}


function playerWhoAnsweredRightGetsToPick() {
  
  let cards = [];

  cards[0] = document.getElementById("card1");
  cards[1] = document.getElementById("card2");
  cards[2] = document.getElementById("card3");
  cards[3] = document.getElementById("card4");

  for (let i = 0; i < getPlayerNames().length; i++) {
    cards[i].classList.remove("card-selected");
  }

  cards[playerWhoBussedFirst].classList.add("card-selected");

  sessionStorage.setItem("currentPlayersTurn" , playerWhoBussedFirst);

}



//--------------------------------------------------------------------------------------------------------