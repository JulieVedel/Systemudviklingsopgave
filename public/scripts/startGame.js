function startGame() {
 console.log(validateCategories());
 
 if (validatePlayerBuzzers() && validatePlayerNames() && validateCategories()) {
  let dd1 = document.getElementById("kategori1");
  sessionStorage.setItem("cat1" , dd1.value);
  sessionStorage.setItem("cat1name", dd1.options[dd1.selectedIndex].text);

  console.log(sessionStorage.getItem("cat1"));
  console.log(sessionStorage.getItem("cat1name"))

  let dd2 = document.getElementById("kategori2");
  sessionStorage.setItem("cat2", dd2.value);
  sessionStorage.setItem("cat2name", dd2.options[dd2.selectedIndex].text);

  let dd3 = document.getElementById("kategori3");
  sessionStorage.setItem("cat3", dd3.value);
  sessionStorage.setItem("cat3name", dd3.options[dd3.selectedIndex].text);

  let dd4 = document.getElementById("kategori4");
  sessionStorage.setItem("cat4", dd4.value);
  sessionStorage.setItem("cat4name", dd4.options[dd4.selectedIndex].text);

  let dd5 = document.getElementById("kategori5");
  sessionStorage.setItem("cat5", dd5.value);
  sessionStorage.setItem("cat5name", dd5.options[dd5.selectedIndex].text);

  let dd6 = document.getElementById("kategori6");
  sessionStorage.setItem("cat6", dd6.value);
  sessionStorage.setItem("cat6name", dd6.options[dd6.selectedIndex].text);

  let dd7 = document.getElementById("kategori7");
  sessionStorage.setItem("cat7", dd7.value);
  sessionStorage.setItem("cat7name", dd7.options[dd7.selectedIndex].text);

  let dd8 = document.getElementById("kategori8");
  sessionStorage.setItem("cat8", dd8.value);
  sessionStorage.setItem("cat8name", dd8.options[dd8.selectedIndex].text);

  let dd9 = document.getElementById("kategori9");
  sessionStorage.setItem("cat9", dd9.value);
  sessionStorage.setItem("cat9name", dd9.options[dd9.selectedIndex].text);

  let dd10 = document.getElementById("kategori10");
  sessionStorage.setItem("cat10", dd10.value);
  sessionStorage.setItem("cat10name", dd10.options[dd10.selectedIndex].text);

  let dd11 = document.getElementById("kategori11");
  sessionStorage.setItem("cat11", dd11.value);
  sessionStorage.setItem("cat11name", dd11.options[dd11.selectedIndex].text);

  let dd12 = document.getElementById("kategori12");
  sessionStorage.setItem("cat12", dd12.value);
  sessionStorage.setItem("cat12name", dd12.options[dd12.selectedIndex].text);

  savePlayerInSession();

  window.location.href = 'http://localhost:5500/tableVeiw';

 } else if (!validatePlayerBuzzers()) {
  window.alert("Indstil en buzzerknap for alle synlige spillere, og prøv igen.");
 } else if (!validatePlayerNames()) {
  window.alert("Udfyld navne for alle synlige spillere, og prøv igen.");
 } else if (!validateCategories()) {
  window.alert("Udfyld alle kategorier, og prøv igen.");
 }; 
}; 

function savePlayerInSession () {

    if (window.getComputedStyle(document.getElementById('spillerForm1')).display != "none") {
        sessionStorage.setItem("player1", document.getElementById("spiller1").value);
    };
    
    if (window.getComputedStyle(document.getElementById('spillerForm2')).display != "none") {
        sessionStorage.setItem("player2", document.getElementById("spiller2").value);
    };

    if (window.getComputedStyle(document.getElementById('spillerForm3')).display != "none") {
        sessionStorage.setItem("player3", document.getElementById("spiller3").value);
    };

    if (window.getComputedStyle(document.getElementById('spillerForm4')).display != "none") {
        sessionStorage.setItem("player4", document.getElementById("spiller4").value);
    };
};

function validatePlayerBuzzers(){

 console.log("buzzer1Label:", document.getElementById('buzzer1Label').innerHTML == "");

 let validationOfBuzzersOK = true;

 if (window.getComputedStyle(document.getElementById('spillerForm1')).display != "none" && document.getElementById('buzzer1Label').innerHTML == "Buzzerknap: ") {
  validationOfBuzzersOK = false;
 };

 if (window.getComputedStyle(document.getElementById('spillerForm2')).display != "none" && document.getElementById('buzzer2Label').innerHTML == "Buzzerknap: ") {
  validationOfBuzzersOK = false;
 };

 if (window.getComputedStyle(document.getElementById('spillerForm3')).display != "none" && document.getElementById('buzzer3Label').innerHTML == "Buzzerknap: ") {
  validationOfBuzzersOK = false;
 };

 if (window.getComputedStyle(document.getElementById('spillerForm4')).display != "none" && document.getElementById('buzzer4Label').innerHTML == "Buzzerknap: ") {
  validationOfBuzzersOK = false;
 };
 return validationOfBuzzersOK;
};

validatePlayerBuzzers();

function validatePlayerNames(){

 console.log("buzzer1Label:", document.getElementById('buzzer1Label').innerHTML == "");

 let validationOfNamesOK = true;

 if (window.getComputedStyle(document.getElementById('spillerForm1')).display != "none" && document.getElementById('spiller1').value == "") {
  validationOfNamesOK = false;
 };

 if (window.getComputedStyle(document.getElementById('spillerForm2')).display != "none" && document.getElementById('spiller2').value == "") {
  validationOfNamesOK = false;
 };

 if (window.getComputedStyle(document.getElementById('spillerForm3')).display != "none" && document.getElementById('spiller3').value == "") {
  validationOfNamesOK = false;
 };

 if (window.getComputedStyle(document.getElementById('spillerForm4')).display != "none" && document.getElementById('spiller4').value == "") {
  validationOfNamesOK = false;
 };
 return validationOfNamesOK;
};

validatePlayerNames();

function validateCategories(){
 for (let i = 1; i < 13; i++) {
  if (document.getElementById(`kategori${i}`).value === "default") {
   console.log(document.getElementById(`kategori${i}`).value);
   return false;
  };
 };
 return true;
};

validateCategories();