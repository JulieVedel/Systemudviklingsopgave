// ------------------------------ REGLER POPUP ------------------------------------
function showHelpPopup() {

 var popup = document.getElementById("popup");
 popup.classList.add("open-popup");

 var popup = document.getElementById("fadeBackground");
 popup.classList.add("fade");

};

function closeHelpPopup() {

 var popup = document.getElementById("startingPlayerPopup");
 popup.classList.remove("open-popup");

document.getElementById("startingRoundTwo").classList.remove("open-popup");

 var popup = document.getElementById("fadeBackground");
 popup.classList.remove("fade");

};
// --------------------------------------------------------------------------------

// ------------------------------ BUZZER POPUP ------------------------------------
// SMELLY CODE DETECTED!!!!!!!!!!!!!

// OBS FJERN ONKEY NÅR POPUP LUKKES!!!
function showBuzzerPopup(buzzerInputField) {

 document.onkeydown = function (e) {
  e = e || window.event;
  var popupText = document.getElementById("popupBuzzerText");
  //Reset warning:
  popupText.innerHTML = "Vælg en knap på tastaturet!";
  popupText.style.color = 'black';
  //validering her:
  var buzzerLabel = document.getElementById(`${buzzerInputField}Label`);
  let buzzerLabels = document.getElementsByClassName("buzzerLabel");
  let buzzerAssignments = getBuzzerAssignments();
  for (let i = 0; i < buzzerAssignments.length; i++) {
   //Knappen findes for en anden spiller:
   if (e.key == buzzerAssignments[i]){
    let buzzerText = "Buzzerknap: " + e.key;
    buzzerLabel.innerText = buzzerText;
    buzzerLabels[i].innerHTML = "Buzzerknap: ";
    sessionStorage.setItem(buzzerLabel.id, e.key);
    closeBuzzerPopup();
    document.onkeydown = null;
   };
   //Knappen findes ikke:
   let buzzerText = "Buzzerknap: " + e.key;
   buzzerLabel.innerText = buzzerText;
   sessionStorage.setItem(buzzerLabel.id, e.key);
   closeBuzzerPopup();
   document.onkeydown = null;
  };

     console.log(buzzerLabel.id);

 };

 var popup = document.getElementById("popupBuzzer");
 popup.classList.add("open-popupBuzzer");

 var popup = document.getElementById("fadeBackground");
 popup.classList.add("fade");

};

function closeBuzzerPopup() {

 var popup = document.getElementById("popupBuzzer");
 popup.classList.remove("open-popupBuzzer");

 var popup = document.getElementById("fadeBackground");
 popup.classList.remove("fade");

};

function getBuzzerAssignments(){

 let buzzerLabels = document.getElementsByClassName("buzzerLabel");

 let buzzerAssignments = [];
 for (let i = 0; i < buzzerLabels.length; i++) {
  buzzerAssignments[i] = [buzzerLabels[i].innerHTML.substring(12,13)];
 };

 return buzzerAssignments;
};
// --------------------------------------------------------------------------------

function showStartingPlayerPopup() {

    var popup = document.getElementById("startingPlayerPopup");
    popup.classList.add("open-popup");
   
    var popup = document.getElementById("fadeBackground");
    popup.classList.add("fade");


   
   };
   
   function closeStartingPlayerPopup() {
   
    var popup = document.getElementById("startingPlayerPopup");
    popup.classList.remove("open-popup");
   
    var popup = document.getElementById("fadeBackground");
    popup.classList.remove("fade");
    
    document.getElementById("startingRoundTwo").classList.remove("open-popup");
   };



