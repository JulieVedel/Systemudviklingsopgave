class User {
 
 constructor(username, points, opponent1, opponent2, opponent3) {
  this.username = username;
  this.points = points;
  this.opponent1 = opponent1;
  this.opponent2 = opponent2;
  this.opponent3 = opponent3;
 };
};

async function savePlayerDataToMongoDB() {

 // player name null fix: (undgå at tabellen viser "null" for ikke eksisterende spillere.)
 for (let i = 1; i < 5; i++) {
  if (sessionStorage.getItem(`player${i}`) == null) {
   sessionStorage.setItem(`player${i}`, '');
  };
 };

// TODO: brug player points fra sessionStorage, når de er tilgængelige:
 console.log("savePlayerDataToMongoDB");
 const user1 = new User(
  sessionStorage.getItem("player1"),
  1550,
  sessionStorage.getItem("player2"),
  sessionStorage.getItem("player3"),
  sessionStorage.getItem("player4")
 );
 
 const user2 = new User(
  sessionStorage.getItem("player2"),
  1275,
  sessionStorage.getItem("player1"),
  sessionStorage.getItem("player3"),
  sessionStorage.getItem("player4")
 );

 const user3 = new User(
  sessionStorage.getItem("player3"),
  500,
  sessionStorage.getItem("player1"),
  sessionStorage.getItem("player2"),
  sessionStorage.getItem("player4")
 );

 const user4 = new User(
  sessionStorage.getItem("player4"),
  450,
  sessionStorage.getItem("player1"),
  sessionStorage.getItem("player2"),
  sessionStorage.getItem("player3")
 );
 
 console.log("user1", user1);
 
 const users = [];
 users.push(user1);
 users.push(user2);
 users.push(user3);
 users.push(user4);

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

 console.log("running getTop10");

 const res = await fetch('http://localhost:3000/scoreboardInfo', {
  method: 'GET'
 });

 console.log("res",res);

 const data = await res.json();
 console.log("data",data);

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

 let i = 1;
 let adjustedPoints;
 let adjustedRank;

 data.forEach(element => {
  let playDate = element.createdAt + "";
  playDate = playDate.substring(0,10);

  if(element.points == null) {
   adjustedPoints = "";
  } else {
   adjustedPoints = element.points;
  };
  // console.log(element.points);
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

// class="highlight"
  let userFields = `
 <tr id="rank${i}">
  <td>${adjustedRank}</td>
  <td>${element.username}</td>
  <td>${adjustedPoints}</td>
  <td>${playDate}</td>
  <td>${element.opponent1}</td>
  <td>${element.opponent2}</td>
  <td>${element.opponent3}</td>
 </tr>`

 document.getElementById("scoreboard").innerHTML += userFields;
 i++;
 });
};

async function getPlayerRanks() {

 console.log("running getTop10");

 const res = await fetch('http://localhost:3000/playerRanks', {
  method: 'GET'
 });

 console.log("res",res);

 const data = await res.json();
 console.log("data",data);

 data.forEach(element => {
  console.log(element);
  document.getElementById(`rank${element}`).classList.add("highlight");
 });
};

console.log("preventScoreboardRefresh", sessionStorage.getItem("preventScoreboardRefresh"));

function showScoreBoardData(){
 if (sessionStorage.getItem("preventScoreboardRefresh") == 0) {
   sessionStorage.setItem("preventScoreboardRefresh", 1);
   savePlayerDataToMongoDB();

 };
 return;
};


showScoreBoardData();
getTop10();
getPlayerRanks();

//HUSK AT CLEANE sessionStorage her: