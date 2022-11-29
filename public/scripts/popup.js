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

function showBuzzerPopup(buzzerInputField) {
 console.log(buzzerInputField);

 let buzzerKnap = document.getElementById(buzzerInputField);

 //Ryd gammel knap-tildeling:
 document.removeEventListener("keydown", event => {
  // Læs lige hvad isComposing gør?:
  if (event.isComposing || event.key !== buzzerKnap.value) {
   return;
 };
});
buzzerKnap.value = "";

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

function test() {
 console.log("onended");
};