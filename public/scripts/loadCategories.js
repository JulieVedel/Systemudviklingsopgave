let showCategoriHeading = true;
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
  let randomCatOffset = Math.round(Math.random()*8000);
  let apiPath = `https://jservice.io/api/categories?count=100&offset=${randomCatOffset}`;
  const response = await fetch(apiPath);
  const data = await response.json();
  console.log("Raw data, categories:", data);
  // Test for tomme kategorier og byg cats med 60 kategorier:
  // rename "cats"
  let cats = [];
  for (i = 0; cats.length < 60; i++){
   //4068 er "name that artist" og burde vist indeholde billeder...
    if (data[i].clues_count > 4 && data.id != 4068){
     cats.push(data[i]);
    };
  };
  //Randomize cats array:
  shuffle(cats);
   // Load dropdowns:
   for (let i = 0; i < 12; i++) {
    let choice = document.getElementById(`kategori${i+1}`);
    choice.innerHTML = "";
    if (showCategoriHeading) {
     choice.innerHTML += `<option value='default'>Vælg kategori</option>`;
    }
    for (j = 0; j < 5; j++){
     let counter = (j)+i*5;
     choice.innerHTML += `<option value=${cats[counter].id}>${cats[counter].title}</option>`;
     console.log(counter);
     console.log()
    };
   };
   showCategoriHeading = false;
 } catch (e) {
  console.log(e);
  console.log("There was an error fetching the data");
 };
};
loadCategories();