// ------------------------------ REGLER POPUP ------------------------------------
function showHelpPopup() {

 var popup = document.getElementById("popup");
 popup.classList.add("open-popup");

 var popup = document.getElementById("fadeBackground");
 popup.classList.add("fade");

};

function closeHelpPopup() {

 var popup = document.getElementById("popup");
 popup.classList.remove("open-popup");

 var popup = document.getElementById("fadeBackground");
 popup.classList.remove("fade");

};
// --------------------------------------------------------------------------------

// ------------------------------ BUZZER POPUP ------------------------------------
// SMELLY CODE DETECTED!!!!!!!!!!!!!
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
  let buzzerSelections = validateBuzzers();
  for (let i = 0; i < buzzerSelections.length; i++) {
   //Knappen findes på et synligt felt:
   if (e.key == buzzerSelections[i][0] && buzzerSelections[i][1] === false){
    popupText.innerHTML = "Knappen er allerede i brug, prøv en anden.";
    popupText.style.color = 'red';
    return;
   };
   //Knappen findes på et usynligt felt:
   if (e.key == buzzerSelections[i][0] && buzzerSelections[i][1] === true){
    buzzerLabels[i].innerHTML = "Buzzerknap: ";
    let buzzerText = "Buzzerknap: " + e.key;
    buzzerLabel.innerText = buzzerText;
    sessionStorage.setItem(buzzerLabel.id, e.key);
    closeBuzzerPopup();
    return;
   };
   //Knappen findes ikke:
   let buzzerText = "Buzzerknap: " + e.key;
   buzzerLabel.innerText = buzzerText;
   sessionStorage.setItem(buzzerLabel.id, e.key);
   closeBuzzerPopup();
  };
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

function validateBuzzers(){

 let buzzerLabels = document.getElementsByClassName("buzzerLabel");

 let playerForm = [
  document.getElementById("spillerForm1"), 
  document.getElementById("spillerForm2"),
  document.getElementById("spillerForm3"),
  document.getElementById("spillerForm4")
 ];

 let buzzerSelections = [];
 for (let i = 0; i < buzzerLabels.length; i++) {
  buzzerSelections[i] = [buzzerLabels[i].innerHTML.substring(12,13),(window.getComputedStyle(playerForm[i]).display === "none")];
  console.log(buzzerLabels[i].id, "ComputedStyleNone?:", window.getComputedStyle(playerForm[i]).display === "none");
 };

 return buzzerSelections;
};
// --------------------------------------------------------------------------------