// Global counter:
let globalI = 0;



//Stjålet fra: https://bost.ocks.org/mike/shuffle/ og https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
 var m = array.length, t, i;

 // While there remain elements to shuffle…
 while (m) {

   // Pick a remaining element…
   i = Math.floor(Math.random() * m--);

   // And swap it with the current element.
   t = array[m];
   array[m] = array[i];
   array[i] = t;
 };

 return array;
};



// Hent data fra API via JSON
async function loadCategories() {

 try {
  // Sæt offset til random (0,xyz * 10 * 1000):
  // rename randomCatOffset

  let randomCatOffset = Math.round(Math.random()*8000);

  let apiPath = `https://jservice.io/api/categories?count=100&offset=${randomCatOffset}`;

  const response = await fetch(apiPath);

  const data = await response.json();

  console.log("Raw data, categories:", data);

  // rename "catArray"
  let catArray = [[],[],[],[],[],[],[],[],[],[],[],[]];

  // Test for tomme kategorier og byg cats med 60 kategorier:
  // rename "cats"
  let cats = [];
  for (i = 0; cats.length < 60; i++){
    if (data[i].clues_count > 4){

     cats.push(data[i]);
    };
  };





  //Randomize cats array:
  shuffle(cats);

  console.log("Adjusted categories: ", cats);
  console.log("catArray: ", catArray);
  
  // ----------------- GEM ALT DET HER TIL REFACTORING!!!! NIX PILLE!!!! -------------------------

  let catArray1 = [];
  for (i = 0; i < 5; i++){
   catArray1.push(cats[i]);
  };

  let catArray2 = [];
  for (i = 5; i < 10; i++){
    catArray2.push(cats[i]);
  };

  let catArray3 = [];
  for (i = 10; i < 15; i++){
    catArray3.push(cats[i]);
  };

  let catArray4 = [];
  for (i = 15; i < 20; i++){
    catArray4.push(cats[i]);
  };

  let catArray5 = [];
  for (i = 20; i < 25; i++){
    catArray5.push(cats[i]);
  };

  let catArray6 = [];
  for (i = 25; i < 30; i++){
    catArray6.push(cats[i]);
  };

  let catArray7 = [];
  for (i = 30; i < 35; i++){
    catArray7.push(cats[i]);
  };

  let catArray8 = [];
  for (i = 35; i < 40; i++){
    catArray8.push(cats[i]);
  };

  let catArray9 = [];
  for (i = 40; i < 45; i++){
    catArray9.push(cats[i]);
  };

  let catArray10 = [];
  for (i = 45; i < 50; i++){
    catArray10.push(cats[i]);
  };

  let catArray11 = [];
  for (i = 50; i < 55; i++){
    catArray11.push(cats[i]);
  };

  let catArray12 = [];
  for (i = 55; i < 60; i++){
    catArray12.push(cats[i]);
  };
  
  catArray[0].push(catArray1);
  catArray[1].push(catArray2);
  catArray[2].push(catArray3);
  catArray[3].push(catArray4);
  catArray[4].push(catArray5);
  catArray[5].push(catArray6);

  catArray[6].push(catArray7);
  catArray[7].push(catArray8);
  catArray[8].push(catArray9);
  catArray[9].push(catArray10);
  catArray[10].push(catArray11);
  catArray[11].push(catArray12);
  
   // const catSel = document.getElementById(`catSelector${k}`);
   // catSel.innerHTML += `<option value='test'>${catArray[k][0][j].title}</option>`

   // ------------------------ RUNDE1 -----------------------------------------------

   if (globalI == 0) {
    
    // Dropdown1:
    let choice1 = document.getElementById("kategori1");
    choice1.innerHTML = "";
    // Tilføj denne til alle dropdowns?
    // Standard: Alle har "Vælg kategori" - Men knappen Tildel tilfældige kategorier, skal fjerne overskriften "Vælg kategori"
    choice1.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     

     
      // ----------tilføj type="submit" til den valgte kategori, for at kunne gemme den i sessionStorage:------------------
      choice1.innerHTML += `<option value=${catArray[0][0][j].title}>${catArray[0][0][j].title}</option>`;
      // Og brug dette for at hente den valgte værdi:
      // var e = document.getElementById("kategori1");
      // var value = e.value;
      // var text = e.options[e.selectedIndex].text;
      // ------------------------------------------------------------------------------------------------------------------
      

      // -------------------------------tilføj custom data til option:-----------------------------------------------------
      // data-cat_id="89"

      // brug noget a la det her for at sætte værdi i sessionStorage:
      // function addListener(){
      //  QuestionsForm.addEventListener('submit', function(event) {
      //   event.preventDefault();
      //   let submitter = event.submitter;
      //   localStorage.setItem("questionValue", submitter.value);
      //   //WEIRD. selvom property hedder data-cat, bruges dataset.cat til at fange den igen:
      //   //Se evt.: https://stackoverflow.com/questions/71815082/how-can-i-get-custom-data-attribute
      
      //   localStorage.setItem("questionCategoryId", submitter.dataset.cat_id);
      
      //   window.location.href = "clues.html";
        
      //  });
      // };
      // ------------------------------------------------------------------------------------------------------------------


      // ------------------------------- opret evt clues klasse?: ---------------------------------------------------------
      // class Clues {
      //  constructor(_question, _answer, _value, _category){
      //   this.question = _question
      //   this.answer = _answer
      //   this.value = _value
      //   this.category = _category
      //  }
      // }
      
      // async function getQuestionTest() {
      
      //  try {
      
      //   // const response = await fetch(`https://jservice.io/api/random`);
      
      //   const questionValue = localStorage.getItem("questionValue");
      //   console.log("Locally stored clicked question value: ", questionValue);
      //   const questionCatId = localStorage.getItem("questionCategoryId");
      //   console.log("Locally stored clicked question category: ", questionCatId);
      
      //   const response = await fetch(`https://jservice.io/api/clues?value=${questionValue}&category=${questionCatId}`);
      
      //   const data = await response.json();
      
      //   console.log("Raw returned data: ", data[0]);
      
      //   const clue = new Clues(data[0].question, data[0].answer, data[0].value, data[0].category.id);
      
      //   console.log("my clue object created from raw data: ", clue);
      
      //  } catch (e) {
      //   console.log(e);
      //   console.log("There was an error fetching the data");
      //  };
      // };
      // ------------------------------------------------------------------------------------------------------------------
    };

    
    // Dropdown2:
    let choice2 = document.getElementById("kategori2");
    choice2.innerHTML = "";
    choice2.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice2.innerHTML += `<option value=${catArray[1][0][j].id}>${catArray[1][0][j].title}</option>`;
    };

    // Dropdown3:
    let choice3 = document.getElementById("kategori3");
    choice3.innerHTML = "";
    choice3.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice3.innerHTML += `<option value=${catArray[2][0][j].id}>${catArray[2][0][j].title}</option>`;
    };

    // Dropdown4:
    let choice4 = document.getElementById("kategori4");
    choice4.innerHTML = "";
    choice4.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice4.innerHTML += `<option value=${catArray[3][0][j].id}>${catArray[3][0][j].title}</option>`;
    };

    // Dropdown5:
    let choice5 = document.getElementById("kategori5");
    choice5.innerHTML = "";
    choice5.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice5.innerHTML += `<option value=${catArray[4][0][j].id}>${catArray[4][0][j].title}</option>`;
    };

    // Dropdown6:
    let choice6 = document.getElementById("kategori6");
    choice6.innerHTML = "";
    choice6.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice6.innerHTML += `<option value=${catArray[5][0][j].id}>${catArray[5][0][j].title}</option>`;
    };

    // ------------------------ RUNDE2 -----------------------------------------------

    // Dropdown7:
    let choice7 = document.getElementById("kategori7");
    choice7.innerHTML = "";
    choice7.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice7.innerHTML += `<option value=${catArray[6][0][j].id}>${catArray[6][0][j].title}</option>`;
    };

    // Dropdown8:
    let choice8 = document.getElementById("kategori8");
    choice8.innerHTML = "";
    choice8.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice8.innerHTML += `<option value=${catArray[7][0][j].id}>${catArray[7][0][j].title}</option>`;
    };

    // Dropdown9:
    let choice9 = document.getElementById("kategori9");
    choice9.innerHTML = "";
    choice9.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice9.innerHTML += `<option value=${catArray[8][0][j].id}>${catArray[8][0][j].title}</option>`;
    };

    // Dropdown10:
    let choice10 = document.getElementById("kategori10");
    choice10.innerHTML = "";
    choice10.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice10.innerHTML += `<option value=${catArray[9][0][j].id}>${catArray[9][0][j].title}</option>`;
    };

    // Dropdown11:
    let choice11 = document.getElementById("kategori11");
    choice11.innerHTML = "";
    choice11.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice11.innerHTML += `<option value=${catArray[10][0][j].id}>${catArray[10][0][j].title}</option>`;
    };

    // Dropdown12:
    let choice12 = document.getElementById("kategori12");
    choice12.innerHTML = "";
    choice12.innerHTML += `<option value='test'>Vælg kategori</option>`;
    for (j = 0; j < 5; j++){     
      choice12.innerHTML += `<option value=${catArray[11][0][j].id}>${catArray[11][0][j].title}</option>`;
    };

    console.log(randomCatOffset);
    globalI++;

  } else {

    // Dropdown1:
    let choice1 = document.getElementById("kategori1");
    choice1.innerHTML = "";
    for (j = 0; j < 5; j++){     
      // console.log(catArray[0][0][j].title);
      choice1.innerHTML += `<option value=${catArray[0][0][j].id}>${catArray[0][0][j].title}</option>`;
    };

    
    // Dropdown2:
    let choice2 = document.getElementById("kategori2");
    choice2.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice2.innerHTML += `<option value=${catArray[1][0][j].id}>${catArray[1][0][j].title}</option>`;
    };

    // Dropdown3:
    let choice3 = document.getElementById("kategori3");
    choice3.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice3.innerHTML += `<option value=${catArray[2][0][j].id}>${catArray[2][0][j].title}</option>`;
    };

    // Dropdown4:
    let choice4 = document.getElementById("kategori4");
    choice4.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice4.innerHTML += `<option value=${catArray[3][0][j].id}>${catArray[3][0][j].title}</option>`;
    };

    // Dropdown5:
    let choice5 = document.getElementById("kategori5");
    choice5.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice5.innerHTML += `<option value=${catArray[4][0][j].id}>${catArray[4][0][j].title}</option>`;
    };

    // Dropdown6:
    let choice6 = document.getElementById("kategori6");
    choice6.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice6.innerHTML += `<option value=${catArray[5][0][j].id}>${catArray[5][0][j].title}</option>`;
    };

    // ------------------------ RUNDE2 -----------------------------------------------

    // Dropdown7:
    let choice7 = document.getElementById("kategori7");
    choice7.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice7.innerHTML += `<option value=${catArray[6][0][j].id}>${catArray[6][0][j].title}</option>`;
    };

    // Dropdown8:
    let choice8 = document.getElementById("kategori8");
    choice8.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice8.innerHTML += `<option value=${catArray[7][0][j].id}>${catArray[7][0][j].title}</option>`;
    };

    // Dropdown9:
    let choice9 = document.getElementById("kategori9");
    choice9.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice9.innerHTML += `<option value=${catArray[8][0][j].id}>${catArray[8][0][j].title}</option>`;
    };

    // Dropdown10:
    let choice10 = document.getElementById("kategori10");
    choice10.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice10.innerHTML += `<option value=${catArray[9][0][j].id}>${catArray[9][0][j].title}</option>`;
    };

    // Dropdown11:
    let choice11 = document.getElementById("kategori11");
    choice11.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice11.innerHTML += `<option value=${catArray[10][0][j].id}>${catArray[10][0][j].title}</option>`;
    };

    // Dropdown12:
    let choice12 = document.getElementById("kategori12");
    choice12.innerHTML = "";
    for (j = 0; j < 5; j++){     
      choice12.innerHTML += `<option value=${catArray[11][0][j].id}>${catArray[11][0][j].title}</option>`;
    };

    console.log(randomCatOffset);

    console.log(globalI);

  }
  
  // Global counter til kategori-overskrifter:

  console.log(globalI);


 } catch (e) {
  console.log(e);
  console.log("There was an error fetching the data");
 }
};






loadCategories();


