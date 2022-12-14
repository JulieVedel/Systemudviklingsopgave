async function startGame() {
 if (validatePlayerBuzzers() && validatePlayerNames()){
  // randomize ALLE kategorier, hvis én ikke er valgt:
  if (document.getElementById(`kategori1`).value == "default") {
   await window.loadCategories();
  };
  // for (let i = 1; i < 13; i++) {
  //  sessionStorage.setItem(`cat${i}` , document.getElementById(`kategori${i}`).value);
  //  sessionStorage.setItem(`cat${i}name`, document.getElementById(`kategori${i}`).options[document.getElementById(`kategori${i}`).selectedIndex].text);
  // };
  for (let i = 1; i < 13; i++) {
   let randNum = Math.floor(Math.random()*5);
   if (document.getElementById(`kategori${i}`).value == "default") {
    // console.log("running default:", document.getElementById(`kategori${i}`).value);
    // console.log("ID:",document.getElementById(`kategori${i}`).options[randNum].value);
    // console.log("Name:", document.getElementById(`kategori${i}`).options[randNum].text);
    sessionStorage.setItem(`cat${i}` , document.getElementById(`kategori${i}`).options[randNum].value);
    sessionStorage.setItem(`cat${i}name`, document.getElementById(`kategori${i}`).options[randNum].text);
   } else {
    sessionStorage.setItem(`cat${i}` , document.getElementById(`kategori${i}`).value);
    sessionStorage.setItem(`cat${i}name`, document.getElementById(`kategori${i}`).options[document.getElementById(`kategori${i}`).selectedIndex].text);
   };
  };

  savePlayerInSession();
  window.location.href = 'http://localhost:3000/tableVeiw';
 } else if (!validatePlayerBuzzers()) {
  window.alert("Indstil en buzzerknap for alle synlige spillere, og prøv igen.");
 } else if (!validatePlayerNames()) {
  window.alert("Udfyld navne for alle synlige spillere, og prøv igen.");
 };
}; 

function savePlayerInSession () {
 for (let i = 1; i < 5; i++) {
  if (window.getComputedStyle(document.getElementById(`spillerForm${i}`)).display != "none") {
   sessionStorage.setItem(`player${i}`, document.getElementById(`spiller${i}`).value);
   sessionStorage.setItem(`pointsPlayer${i}`, "0");
  };
 };
};

function validatePlayerBuzzers(){
 let validationOfBuzzersOK = true;
 for (let i = 1; i < 5; i++) {
  if (window.getComputedStyle(document.getElementById(`spillerForm${i}`)).display != "none" && document.getElementById(`buzzer${i}Label`).innerHTML == "Buzzerknap: ") {
   validationOfBuzzersOK = false;
  }; 
 };
 return validationOfBuzzersOK;
};

function validatePlayerNames(){
 let validationOfNamesOK = true;
 for (let i = 1; i < 5; i++) {
  if (window.getComputedStyle(document.getElementById(`spillerForm${i}`)).display != "none" && document.getElementById(`spiller${i}`).value == "") {
   validationOfNamesOK = false;
  }; 
 };
 return validationOfNamesOK;
};