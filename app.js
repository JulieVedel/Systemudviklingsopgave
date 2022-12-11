const express = require('express');

// express app:
const app = express();

// register view engine (ejs): (kigger automatisk i views folder)
app.set('view engine', 'ejs');
// eller custom folder fx.:
//app.set('views', 'myEjsViews');

const { json } = require('express');
// MONGO:
const { MongoClient, ServerApiVersion } = require('mongodb');

//mongoose:
const mongoose = require('mongoose');
const { insertMany } = require('./models/user');

// USER:
const User = require('./models/user');

// lodash:
const { result } = require('lodash');

// mongo database connection string:
const dbURI = 'mongodb+srv://user1:1234@cluster0.1kjeku1.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbURI)
 // .then((result) => console.log('connected to db'))
 // server lytter kun hvis der er oprettet forbindelse til db:
 .then((result) => app.listen(3000))
 //"app.listen": autosets Header and status codes and content types
 .catch((err) => console.log(err));
// eller:
mongoose.connect(dbURI, { useNewUrlParser: true, useUnitiedTopology: true});

//listen for req: (localhost assumed)
// app.listen(5500);

//Middleware and static files. static gør at filer i den tildelte mappe public kan tilgås
// http://localhost:5500/images/logo.png
app.use(express.static('public'));
app.use(express.json());

// USER FUNCTIONS:

// Add via side:
// app.get('/add-user', (req, res) => {
//  const user = new User({
//    username: 'test',
//    points: 4444,
//    opponent1: 'Thomas',
//    opponent2: 'Julie',
//    opponent3: 'Daniel'
//  });
//  // Brug insertMany i stedet for save:
//  User.insertMany(user)
//  // user.save()
//  .then((result) => {
//   res.send(result)
//  })
//  .catch((err) => {
//   console.log(err);
//  });
// });


// ADD 20 TEST USERS:
// async function add20TestUsers(){
//  for (let i = 0; i < 20; i++) {

//   // const user = new User({
//   //  username: `test${i}`,
//   //  points: 1000+i,
//   //  opponent1: 'Thomas',
//   //  opponent2: 'Julie',
//   //  opponent3: 'Daniel'
//   // });

//   const user = new User({
//    username: "",
//    points: "",
//    opponent1: "",
//    opponent2: "",
//    opponent3: ""
//   });

//   try {
//    let result = await User.insertMany(user);
//     console.log(result);
//     // return result;
//   } catch(err) {
//     console.log(err);
//   };
//  };
// };

// add20TestUsers();


// Global player1ID:
let player1ID;
let player2ID;
let player3ID;
let player4ID;
// ADD SINGLE USER:
//rename til AddPlayers?
async function addUser(users){

 console.log("incomming users:", users);

 // Her skal vi finde en måde at hente kun aktive spillere og tilføje kun dem til array "users" !:

 let user1 = new User(users[0]);
 let user2 = new User(users[1]);
 let user3 = new User(users[2]);
 let user4 = new User(users[3]);
 
 console.log("user1:", user1);

 let usersObj = [];
 usersObj.push(user1);
 usersObj.push(user2);
 usersObj.push(user3);
 usersObj.push(user4);

 console.log("usersObj:", usersObj);

 let i = 1;

 try {
  let result = await User.insertMany(usersObj);

  result.forEach(element => {
   console.log("New Users:", element); 
   console.log("New users id:",element._id);
   if (i == 1) {
    player1ID = element._id;
   };
   if (i == 2) {
    player2ID = element._id;
   };
   if (i == 3) {
    player3ID = element._id;
   };
   if (i == 4) {
    player4ID = element._id;
   };
   i++;
  });

 } catch(err) {
   console.log(err);
 };
};
// addUser();

// // DELETE ALL USERS:
// async function deleteAllUsers(){

//  try {
//   let result = await User.remove({points: {$gt: 1}});
//    // return JSON.stringify(result);
//    // console.log(result);
//    // return result;
//  } catch(err) {
//    console.log(err);
//  };
// };
// deleteAllUsers();

async function getTop10Users(){
 try {
  // let player1 = await addUser();
  let result = await User.find().sort({points: -1}).limit(10);

  // console.log("TOP10:", result);
  
  return result;
 } catch(err) {
  console.log(err);
 };
};
// getTop10Users();

async function checkIfCurrentPlayerIsInTop10(){
 let place = 1;
 let places = [];

 try {
  let result = await getTop10Users();
  console.log("top 10:",result);
  result.forEach(element => {

   if (element._id.equals(player1ID)) {
    console.log("Player 1 er blandt de 10 bedste:", element._id);
    console.log("Player 1 er på plads nr:", place);
    places[0] = place;
   };
   if (element._id.equals(player2ID)) {
    console.log("Player 2 er blandt de 10 bedste:", element._id);
    console.log("Player 2 er på plads nr:", place);
    places[1] = place;
   };
   if (element._id.equals(player3ID)) {
    console.log("Player 3 er blandt de 10 bedste:", element._id);
    console.log("Player 3 er på plads nr:", place);
    places[2] = place;
   };
   if (element._id.equals(player4ID)) {
    console.log("Player 4 er blandt de 10 bedste:", element._id);
    console.log("Player 4 er på plads nr:", place);
    places[3] = place;
   };
   place++;
  });
   return places
 } catch (e) {
  console.log(e);
 };
 console.log(places);
};
 
app.get('/', (req, res) => {
 res.render('index', {title: 'Forside'});
});

app.get('/tableVeiw', (req, res) => {
    res.render('tableVeiw', { title: 'tableVeiw' });
});

app.get('/gamemenu', (req, res) => {
 res.render('gamemenu', {title: 'gamemenu'});
});

app.get('/scoreboardInfo', async function(req, res) {
 const data = await getTop10Users();
 res.status(200).json(data);
});

app.get('/playerRanks', async function(req, res) {
 const data = await checkIfCurrentPlayerIsInTop10();
 res.status(200).json(data);
});

app.post('/savePlayerData', async function(req, res) {
 if(!req.body) {
  res.status(400).send({status: 'failed'});
 };
 await addUser(req.body);
 res.status(200).send({status: 'recieved'});
});

app.get('/scoreboard', (req, res) => {
 res.render('scoreboard', {title: 'scoreboard'});
});

// Denne bruges når ingen andre sider matches med ovenstående: (skal derfor stå til sidst.)
app.use((req, res) => {
 res.status(404).render('404', {title: 'Error'});
});
