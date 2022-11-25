// Hent data via JSON
async function createCluesTable() {

 try {
  // Sæt offset = 50 for runde 2:
  let apiPath = `https://jservice.io/api/categories?count=100&offset=0`;

  const response = await fetch(apiPath);

  const data = await response.json();

  console.log("Raw data, categories:", data);

  let catArray = [[],[],[],[],[],[],[],[],[],[],[],[]];

  let cats = [];
  for (i = 0; cats.length < 60; i++){
    if (data[i].clues_count > 0){
     cats.push(data[i]);
    };
  };

  console.log("Adjusted categories: ", cats);
  console.log("catArray: ", catArray);
  
  // ----------------- GEM ALT DET HER TIL RECFACTORING!!!! NIX PILLE!!!! -------------------------

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

   // Dropdown1:
   let choice1 = document.getElementById("kategori1");
   choice1.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice1.innerHTML += `<option value='test'>${catArray[0][0][j].title}</option>`;
   };

   // Dropdown2:
   let choice2 = document.getElementById("kategori2");
   choice2.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice2.innerHTML += `<option value='test'>${catArray[1][0][j].title}</option>`;
   };

   // Dropdown3:
   let choice3 = document.getElementById("kategori3");
   choice3.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice3.innerHTML += `<option value='test'>${catArray[2][0][j].title}</option>`;
   };

   // Dropdown4:
   let choice4 = document.getElementById("kategori4");
   choice4.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice4.innerHTML += `<option value='test'>${catArray[3][0][j].title}</option>`;
   };

   // Dropdown5:
   let choice5 = document.getElementById("kategori5");
   choice5.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice5.innerHTML += `<option value='test'>${catArray[4][0][j].title}</option>`;
   };

   // Dropdown6:
   let choice6 = document.getElementById("kategori6");
   choice6.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice6.innerHTML += `<option value='test'>${catArray[5][0][j].title}</option>`;
   };

   // ------------------------ RUNDE2 -----------------------------------------------

   // Dropdown7:
   let choice7 = document.getElementById("kategori7");
   choice7.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice7.innerHTML += `<option value='test'>${catArray[6][0][j].title}</option>`;
   };

   // Dropdown8:
   let choice8 = document.getElementById("kategori8");
   choice8.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice8.innerHTML += `<option value='test'>${catArray[7][0][j].title}</option>`;
   };

   // Dropdown9:
   let choice9 = document.getElementById("kategori9");
   choice9.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice9.innerHTML += `<option value='test'>${catArray[5][0][j].title}</option>`;
   };

   // Dropdown10:
   let choice10 = document.getElementById("kategori10");
   choice10.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice10.innerHTML += `<option value='test'>${catArray[5][0][j].title}</option>`;
   };

   // Dropdown11:
   let choice11 = document.getElementById("kategori11");
   choice11.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice11.innerHTML += `<option value='test'>${catArray[5][0][j].title}</option>`;
   };

   // Dropdown12:
   let choice12 = document.getElementById("kategori12");
   choice12.innerHTML = "";
   for (j = 0; j < 5; j++){     
    console.log(catArray[0][0][j].title);
    choice12.innerHTML += `<option value='test'>${catArray[5][0][j].title}</option>`;
   };

  localStorage.clear();

 } catch (e) {
  console.log(e);
  console.log("There was an error fetching the data");
 }
};
createCluesTable();