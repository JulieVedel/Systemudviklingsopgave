// ------------------------------ REGLER POPUP ------------------------------------
function showRulesPopup() {

 var popup = document.getElementById("popup");
 popup.classList.add("open-popup");

 var popup = document.getElementById("fadeBackground");
 popup.classList.add("fade");

};

function closeRulesPopup() {

 var popup = document.getElementById("popup");
 popup.classList.remove("open-popup");

 var popup = document.getElementById("fadeBackground");
 popup.classList.remove("fade");

};
// --------------------------------------------------------------------------------

// ------------------------------ BUZZER POPUP ------------------------------------
// MANGLER: TEST OM KNAP ER SAT I FORVEJEN!
function showBuzzerPopup(buzzerInputField) {

 console.log(`${buzzerInputField}Label`);
 var buzzerLabel = document.getElementById(`${buzzerInputField}Label`);

 buzzerLabel.innerText = "Buzzerknap: ";

 document.onkeydown = function (e) {
  e = e || window.event;
  buzzerLabel.innerText += e.key;
  sessionStorage.setItem(buzzerLabel.id, e.key);
  closeBuzzerPopup();
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

 // test:
 // console.log("buzzerlabel:",sessionStorage.getItem("buzzer1Label"));

};
// --------------------------------------------------------------------------------