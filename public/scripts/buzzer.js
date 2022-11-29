let firstToBuzz = "";

// Skal der tænkes lidt bedre? Teknisk set sætter vi vel listener hver gang der trykkes? Der er kun behov for at sætte 1 gang?
function setBuzzerKey(key, filename) {

 document.addEventListener("keydown", event => {
   // Læs lige hvad isComposing gør?:
   if (event.isComposing || event.key !== key) {
     return;
   };
   if (firstToBuzz == "") {
    // Husk at nulstille firstToBuzz efter hvert spørgsmål:
    firstToBuzz = key;
    console.log(key, "var først!");
    playBuzzer(filename);
   };
   
 });

//  document.addEventListener("keyup", event => {
//   // Læs lige hvad isComposing gør?:
//   if (event.isComposing || event.key !== key) {
//    return;
//  };
//  console.log("key up");

//  closeBuzzerPopup();
 
// });

};



function playBuzzer(filename) {
  var audio = new Audio(`../sounds/${filename}`);
  audio.play();
};