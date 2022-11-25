//Opret for hver aktive spiller:
document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode !== 65) {
   //Find liste over keycodes og omskriv spillerens valg fra fx "A" til 65 og indsæt overfor.
    return;
  }
  playBuzzer();
});
function playBuzzer() {
  var audio = new Audio('../sounds/buzz2.wav');
  audio.play();
};