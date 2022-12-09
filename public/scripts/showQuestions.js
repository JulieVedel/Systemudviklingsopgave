
const RESPONCE_TIME_IN_MILLISECONDS = 100;
let isAnswerCorrect = false;
let round = 1;
let currentPoints = 0; 
let timer = 100;
let clue; 

// row 1
let cells =  document.querySelectorAll('.first th');    
for (var i = 0; i < cells.length; i++) {
 cells[i].onclick = function () {  clickRow1( this.getAttribute("value")); };
};
async function clickRow1(i) {
 clue = await loadQuestion(0, i);
 showQuestionPopup();
};

// row 2
let cells2 = document.querySelectorAll('.second th');
for (var i = 0; i < cells2.length; i++) {

 cells2[i].onclick = function () { clickRow2(this.getAttribute("value")); };
};
async function clickRow2(i) {
 clue = await loadQuestion(1, i);
 showQuestionPopup();
};

// row 3
let cells3 = document.querySelectorAll('.third th');
for (var i = 0; i < cells3.length; i++) {
 cells3[i].onclick = function () { clickRow3(this.getAttribute("value")); };
};
async function clickRow3(i) {
 clue = await loadQuestion(2, i);
 showQuestionPopup();
};

// row 4
let cells4 = document.querySelectorAll('.forth th');
for (var i = 0; i < cells4.length; i++) {
 cells4[i].onclick = function () { clickRow4(this.getAttribute("value")); };
};
async function clickRow4(i) {
 clue = await loadQuestion(3, i);
 showQuestionPopup();
};

// row 5
let cells5 = document.querySelectorAll('.fifth th');
for (var i = 0; i < cells5.length; i++) {
 cells5[i].onclick = function () { clickRow5(this.getAttribute("value")); };
};
async function clickRow5(i) {
 clue = await loadQuestion(4 , i);
 showQuestionPopup();
};


async function loadQuestion(value, categori) {

    currentPoints = (value + 1) * (round * 100);

    let categorieIDs = [];

    categorieIDs.push(sessionStorage.getItem("cat1"));
    categorieIDs.push(sessionStorage.getItem("cat2"));
    categorieIDs.push(sessionStorage.getItem("cat3"));
    categorieIDs.push(sessionStorage.getItem("cat4"));
    categorieIDs.push(sessionStorage.getItem("cat5"));
    categorieIDs.push(sessionStorage.getItem("cat6"));

    console.log("categori", categori);

    console.log("categorieIDs", categorieIDs);

    let apiPath = `https://jservice.io/api/clues?category=${categorieIDs[categori - 1]}`;

    const response = await fetch(apiPath);

    const data = await response.json();

    console.log(data[value]);

    return data[value];

};

console.log(document.querySelectorAll('.first th'));


// ------------------------------ QUESTION POPUP ------------------------------------

let startTimer;

function showQuestionPopup() {

  timer = 100;

  document.getElementById("backQuestion").classList.add("hide");

  document.getElementById("question_popup_H2").innerHTML = "Spørgsmål";

  document.getElementById("thecard").classList.remove("flipcard");

  var popup = document.getElementById("Question_popup");
  popup.classList.add("question-open-popup");

    var popup = document.getElementById("fadeQuestion_popup_background");
    popup.classList.add("fade");

 document.getElementById("question_popup_H2").innerHTML += " til " + currentPoints;

 document.getElementById("question_popup_H2").innerHTML += "<h3>" + clue.question + "</h3>";

 startTimer = window.setInterval(inputTimer, RESPONCE_TIME_IN_MILLISECONDS);

};

function flipCardDelay(){


  document.getElementById("backQuestion").classList.remove("hide");

 document.getElementById("thecard").classList.add("flipcard");
 startTimer = window.setInterval(inputTimer, RESPONCE_TIME_IN_MILLISECONDS);

  document.getElementById("frontQuestion").classList.add("hide")

  document.getElementById("question_popup_H2_Back").innerHTML = "Spørgsmål"

  document.getElementById("answerButton").classList.remove("hide");
  document.getElementById("answerInput").readOnly = false;
  document.getElementById("answerInput").value = "";
  answerResponce.innerText = "";
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

 numberTimeout.innerHTML = timer/10 * RESPONCE_TIME_IN_MILLISECONDS/1000 + " sekunder..."

 if (timer <= 0) {
  clearTimeout(startTimer);
  console.log("tiden er udløbet og der må svares...");
  activateBuzzers();
  document.getElementById("numberTimeout").innerHTML = "DER MÅ NU BUZZES !!!";
 };

 timer = timer - 10;

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
   
  };
  
  if (firstToBuzz == "" && e.key == key2) {
   firstToBuzz = e.key;
   console.log(sessionStorage.getItem("player2"), "var først!");
   playBuzzer();
   document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player2") + " var først!";
   window.setTimeout(flipCardDelay, 1000);
  };

  if (firstToBuzz == "" && e.key == key3) {
   firstToBuzz = e.key;
   console.log(sessionStorage.getItem("player3"), "var først!");
   playBuzzer();
   document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player3") + " var først!";
   window.setTimeout(flipCardDelay, 1000);
  };

  if (firstToBuzz == "" && e.key == key4) {
   firstToBuzz = e.key;
   console.log(sessionStorage.getItem("player4"), "var først!");
   playBuzzer();
   document.getElementById("firstToBuzzH2").innerHTML = sessionStorage.getItem("player4") + " var først!";
   window.setTimeout(flipCardDelay, 1000);
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

 console.log(answerText);
 console.log(clue.answer);
 console.log(checkAnswer(answerText));

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

  }

  console.log(currentPoints);

};

document.getElementById("continueButton").onclick = function () {
  closePopUpAndContinueGame();
}

document.getElementById("itWasRightButton").onclick = function () {
  isAnswerCorrect = true;
  closePopUpAndContinueGame();
}

  function closePopUpAndContinueGame() {
    
    document.getElementById("firstToBuzzH2").innerHTML = "";
    document.getElementById("numberTimeout").innerHTML = "";


    document.getElementById("frontQuestion").classList.remove("hide")

    firstToBuzz = "";
    document.onkeydown = null;

    closeQuestionPopup();

  }





function checkAnswer(answer) {
 // const answerCorrected = answer.replace(/[^a-zA-Z ]/g, "");
 // const clueCorrected = clue.answer.replace(/[^a-zA-Z ]/g, "");
 return (answer.toUpperCase() == clue.answer.toUpperCase());
};

//--------------------------------------------------------------------------------------------------------