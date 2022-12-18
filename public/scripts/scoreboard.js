class Player {
 
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

 //-------------------------------REFACTOR DET HER:-------------------------------------
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

  const players = [];

  if (player1 != "") {
  const player1Obj = new Player(
   player1,
   sessionStorage.getItem("pointsPlayer1"),
   player2,
   player3,
   player4
  );
  players.push(player1Obj);
 };
  
 if (player2 != "") {
  const player2Obj = new Player(
   player2,
   sessionStorage.getItem("pointsPlayer2"),
   player1,
   player3,
   player4
  );
  players.push(player2Obj);
 };

 if (player3 != "") {
  const player3Obj = new Player(
   player3,
   sessionStorage.getItem("pointsPlayer3"),
   player1,
   player2,
   player4
  );
  players.push(player3Obj);
 };

 if (player4 != "") {
  const player4Obj = new Player(
   player4,
   sessionStorage.getItem("pointsPlayer4"),
   player1,
   player2,
   player3
  );
  players.push(player4Obj);
 };
 //-------------------------------------------------------------------------------------

 console.log("Sending these players to POST:", players);
//mangler try catch:
 const res = await fetch('http://localhost:3000/savePlayerData', {
  method: 'POST',
  headers: {
   "Content-Type": 'application/json'
  },
  body: JSON.stringify(players)
 });
};

async function getTop10() {

 const res = await fetch('http://localhost:3000/scoreboardInfo', {
  method: 'GET'
 });

 //rename data
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
 let adjustedRank;

 data.forEach(element => {
  let playDate = element.createdAt + "";
  playDate = playDate.substring(0,10);

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

  let playerFields = `
 <tr id="rank${i}">
  <td>${adjustedRank}</td>
  <td>${element.username}</td>
  <td>${element.points}</td>
  <td>${playDate}</td>
  <td>${element.opponent1}</td>
  <td>${element.opponent2}</td>
  <td>${element.opponent3}</td>
 </tr>`

 document.getElementById("scoreboard").innerHTML += playerFields;
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
 const res = await fetch('http://localhost:3000/playerRanks', {
  method: 'GET'
 });
 //rename data
 const ranks = await res.json();
 ranks.forEach(rank => {
  console.log("rank{element}:", `rank${rank}`);
  document.getElementById(`rank${rank}`).classList.add("highlight");
 });
};

async function getAllPlayerRanks() {
 const res = await fetch('http://localhost:3000/allPlayerRanks', {
  method: 'GET'
 });

 //rename data
 const players = await res.json();
 console.log("getAllPlayerRanks() scoreboards.js allplayers:", players);
 
 // rename element:
 players.forEach(player => {
  console.log("player:", player);
  
  console.log("player.playerObj:", player.playerObj);
  console.log("player.place:", player.place);
  
  if (player.place > 10) {
   console.log("en spiller landede uden for top 10 - på plads:", player.place);
   console.log("document.getElementById('scoreboard').innerHTML FØR:",document.getElementById("scoreboard").innerHTML);
   let playDate = player.playerObj.createdAt.substring(0,10);
   let playerFields = `
   <tr id="rank${player.place}" class="highlight">
    <td>${player.place}</td>
    <td>${player.playerObj.username}</td>
    <td>${player.playerObj.points}</td>
    <td>${playDate}</td>
    <td>${player.playerObj.opponent1}</td>
    <td>${player.playerObj.opponent2}</td>
    <td>${player.playerObj.opponent3}</td>
   </tr>`
  
  document.getElementById("scoreboard").innerHTML += playerFields;
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
