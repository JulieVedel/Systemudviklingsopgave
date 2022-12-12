class User {
 
 constructor(username, points, opponent1, opponent2, opponent3) {
  this.username = username;
  this.points = points;
  this.opponent1 = opponent1;
  this.opponent2 = opponent2;
  this.opponent3 = opponent3;
 };
};

let countPlayers = 0;

async function savePlayerDataToMongoDB() {

// TODO: brug player points fra sessionStorage, når de er tilgængelige:
 console.log("savePlayerDataToMongoDB");
 let player1;
 let player2;
 let player3;
 let player4;
 
  if (sessionStorage.getItem("player1") == null) {
   player1 = "";
  } else {
   player1 = sessionStorage.getItem("player1");
  };
  if (sessionStorage.getItem("player2") == null) {
   player2 = "";
  } else {
   player2 = sessionStorage.getItem("player2");
  };
  if (sessionStorage.getItem("player3") == null) {
   player3 = "";
  } else {
   player3 = sessionStorage.getItem("player3");
  };
  if (sessionStorage.getItem("player4") == null) {
   player4 = "";
  } else {
   player4 = sessionStorage.getItem("player4");
  };

  const users = [];

  if (player1 != "") {
  const user1 = new User(
   player1,
   sessionStorage.getItem("pointsPlayer1"),
   player2,
   player3,
   player4
  );
  users.push(user1);
 };
  
 if (player2 != "") {
  const user2 = new User(
   player2,
   sessionStorage.getItem("pointsPlayer2"),
   player1,
   player3,
   player4
  );
  users.push(user2);
 };

 if (player3 != "") {
  const user3 = new User(
   player3,
   sessionStorage.getItem("pointsPlayer3"),
   player1,
   player2,
   player4
  );
  users.push(user3);
 };

 if (player4 != "") {
  const user4 = new User(
   player4,
   sessionStorage.getItem("pointsPlayer4"),
   player1,
   player2,
   player3
  );
  users.push(user4);
 };

 console.log("Sending these users to POST:", users);

 const res = await fetch('http://localhost:3000/savePlayerData', {
  method: 'POST',
  headers: {
   "Content-Type": 'application/json'
  },
  body: JSON.stringify(users)
 });
};

async function getTop10() {

 const res = await fetch('http://localhost:3000/scoreboardInfo', {
  method: 'GET'
 });

 const data = await res.json();

 document.getElementById("rank1").innerHTML = "";
 document.getElementById("scoreboard").innerHTML = "";
 document.getElementById("scoreboard").innerHTML = `
 <tr id="scoreboard_overskrifter">
 <th>Plads</th>
 <th>Navn</th>
 <th>Point</th>
 <th>Dato</th>
 <th colspan="3">Modstandere</th>
</tr>`

countPlayers = data.length;

 let i = 1;
 // let adjustedPoints;
 let adjustedRank;

 data.forEach(element => {
  let playDate = element.createdAt + "";
  playDate = playDate.substring(0,10);

  // if(element.points == null) {
  //  adjustedPoints = "";
  // } else {
  //  adjustedPoints = element.points;
  // };
  if(playDate == "2022-12-09") {
   playDate = "";
  };

  if (i == 1) {
   adjustedRank = "🥇";
  };
  if (i == 2) {
   adjustedRank = "🥈";
  };
  if (i == 3) {
   adjustedRank = "🥉";
  };
  if (i > 3) {
   adjustedRank = i;
  };

  let userFields = `
 <tr id="rank${i}">
  <td>${adjustedRank}</td>
  <td>${element.username}</td>
  <td>${element.points}</td>
  <td>${playDate}</td>
  <td>${element.opponent1}</td>
  <td>${element.opponent2}</td>
  <td>${element.opponent3}</td>
 </tr>`

 document.getElementById("scoreboard").innerHTML += userFields;
 i++;
 });
};

function fillRestOfTable(){
 let scoreTable = document.getElementById("scoreboard");
 console.log("scoreTable.innerHTML",scoreTable.innerHTML);
 for (let i = 0; i < (10-countPlayers); i++) {
  scoreTable.innerHTML += "<tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>";
  console.log("scoreTable.innerHTML",scoreTable.innerHTML);
 };
};


async function getPlayerRanks() {
 // console.log("running getTop10");
 const res = await fetch('http://localhost:3000/playerRanks', {
  method: 'GET'
 });
 // console.log("res",res);
 const data = await res.json();
 // console.log("data",data);
 data.forEach(element => {
  console.log("rank{element}:", `rank${element}`);
  document.getElementById(`rank${element}`).classList.add("highlight");
 });
};

async function getAllPlayerRanks() {

 console.log("running getAllPlayerRanks");

 const res = await fetch('http://localhost:3000/allPlayerRanks', {
  method: 'GET'
 });

 console.log("res",res);

 const data = await res.json();
 console.log("getAllPlayerRanks() scoreboards.js allplayers:", data);
 
 data.forEach(element => {
  console.log("element:", element);
  
  console.log("element.user:", element.user);
  console.log("element.place:", element.place);
  
  if (element.place > 10) {
   console.log("en spiller landede uden for top 10 - på plads:", element.place);
   console.log("document.getElementById('scoreboard').innerHTML FØR:",document.getElementById("scoreboard").innerHTML);
   let playDate = element.user.createdAt.substring(0,10);
   let userFields = `
   <tr id="rank${element.place}" class="highlight">
    <td>${element.place}</td>
    <td>${element.user.username}</td>
    <td>${element.user.points}</td>
    <td>${playDate}</td>
    <td>${element.user.opponent1}</td>
    <td>${element.user.opponent2}</td>
    <td>${element.user.opponent3}</td>
   </tr>`
  
  document.getElementById("scoreboard").innerHTML += userFields;
  console.log("document.getElementById('scoreboard').innerHTML EFTER:",document.getElementById("scoreboard").innerHTML)
  };
   
 });
};

//rename:
function showScoreBoardData(){
 if (sessionStorage.getItem("preventScoreboardRefresh") == 0) {
   sessionStorage.setItem("preventScoreboardRefresh", 1);
   savePlayerDataToMongoDB();

 };
 return;
};

showScoreBoardData();

await getTop10();
fillRestOfTable();
await getPlayerRanks();
await getAllPlayerRanks();

//HUSK AT CLEANE sessionStorage her: