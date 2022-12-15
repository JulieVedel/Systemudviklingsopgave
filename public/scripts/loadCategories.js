// let data;
// let showCategoriHeading = true;
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
// tilføj categoriNumbers
async function loadCategories() {
 console.log("running loadCategories");
 try {
  let randomCategoryOffset = Math.round(Math.random()*8000);
  let apiPath = `https://jservice.io/api/categories?count=100&offset=${randomCategoryOffset}`;
  const response = await fetch(apiPath);
  let data = await response.json();
  console.log("Raw data, categories:", data);
  // Test for tomme kategorier og byg categories med 60 kategorier:
  let categories = [];

  try {
   for (i = 0; categories.length < 60; i++){
    //4068 er "name that artist" og burde vist indeholde billeder. Så den er sorteret fra her.
     if (data[i].clues_count > 4 && data.id != 4068){
      categories.push(data[i]);
     };
   };
  } catch (e) {
   console.log(e);
   loadCategories();
  };
  //Randomize categories array:
  shuffle(categories);
   // Load dropdowns:
  for (let i = 0; i < 12; i++) {
   let choice = document.getElementById(`kategori${i+1}`);
   choice.innerHTML = "";
   // if (showCategoriHeading) {
    choice.innerHTML += `<option value='default'>Vælg kategori</option>`;
   // }
   for (j = 0; j < 5; j++){
    let counter = (j)+i*5;
    choice.innerHTML += `<option value=${categories[counter].id}>${categories[counter].title}</option>`;
    // console.log(counter);
    console.log();
   };
  };
  // showCategoriHeading = false;
 } catch (e) {
  console.log(e);
  console.log("There was an error fetching the data");
 };
};

loadCategories();

async function randomCategories() {
 console.log("running randomCategories");
 try {
  let randomCategoryOffset = Math.round(Math.random()*8000);
  let apiPath = `https://jservice.io/api/categories?count=100&offset=${randomCategoryOffset}`;
  const response = await fetch(apiPath);
  let data = await response.json();
  console.log("Raw data, categories:", data);

  let categories = [];
  try {
   for (i = 0; categories.length < 60; i++){

     if (data[i].clues_count > 4 && data.id != 4068){
      // denne skal ændres:
      categories.push(data[i]);
     };
   };
  } catch (e) {
   console.log(e);
   randomCategories();
  };

  shuffle(categories);

  let remainingCategoriIDs = [];

  for (let i = 0; i < 12; i++) {
   let choice = document.getElementById(`kategori${i+1}`);
   
   if (choice.value == "default" || choice.value == "") {
    console.log("choice.id", choice.id);
    remainingCategoriIDs[i] = choice.id;
   };
  };
  console.log("remainingCategoriIDs",remainingCategoriIDs);
  
  for (let k = 0; k < remainingCategoriIDs.length; k++) {
   let choice = document.getElementById(`kategori${k+1}`);
   if (choice.id == remainingCategoriIDs[k]) {
    
    choice.innerHTML = "";
    choice.innerHTML += `<option value='default'>Vælg kategori</option>`;

    for (j = 0; j < 5; j++){
     if (choice.id != remainingCategoriIDs[i]) {
     let choice = document.getElementById(`kategori${k+1}`);
     // console.log("choice",choice);
     // console.log("remainingCategoriIDs[i]",remainingCategoriIDs[k]);
     choice.innerHTML += `<option value=${categories[j+k*5].id}>${categories[j+k*5].title}</option>`;
     };
     console.log();
    };
   };
  };
   




  // showCategoriHeading = false;
 } catch (e) {
  console.log(e);
  console.log("There was an error fetching the data");
 };
};

// async function loadRemainingCategories() {
//  console.log("running loadRemainingCategories");
//  try {
//   let randomCategoryOffset = Math.round(Math.random()*8000);
//   let apiPath = `https://jservice.io/api/categories?count=100&offset=${randomCategoryOffset}`;
//   const response = await fetch(apiPath);
//   const data = await response.json();
//   console.log("Raw data, categories:", data);
//   // Test for tomme kategorier og byg categories med 60 kategorier:
//   let categories = [];
//   for (i = 0; categories.length < 60; i++){
//    //4068 er "name that artist" og burde vist indeholde billeder. Så den er sorteret fra her.
//     if (data[i].clues_count > 4 && data.id != 4068){
//      categories.push(data[i]);
//     };
//   };
//   //Randomize categories array:
//   shuffle(categories);
//    // Load dropdowns:
//   for (let i = 0; i < 12; i++) {
//    let choice = document.getElementById(`kategori${i+1}`);
//    if (choice.value == "default") {
//     console.log("Dttne kategorifelt mangler udfyldning:", choice);
//     // choice.innerHTML = "";
//    };
   
   
   
//    // for (j = 0; j < 5; j++){
//    //  let counter = (j)+i*5;
//    //  choice.innerHTML += `<option value=${categories[counter].id}>${categories[counter].title}</option>`;
//    //  // console.log(counter);
//    //  console.log();
//    // };
//   };
//  } catch (e) {
//   console.log(e);
//   console.log("There was an error fetching the data");
//  };
// };