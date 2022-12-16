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
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnitiedTopology: true});
// mongoose.set('strictQuery', false);
// mongoose.set('strictQuery', true);
//listen for req: (localhost assumed)
// app.listen(5500);


//Middleware and static files. static gør at filer i den tildelte mappe public kan tilgås
// http://localhost:5500/images/logo.png
app.use(express.static('public'));
app.use(express.json());

// USER FUNCTIONS:


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

//rename til AddPlayers?
async function addUser(users){

 console.log("incomming users:", users);

 let user1 = new User(users[0]);
 let user2 = new User(users[1]);
 let user3 = new User(users[2]);
 let user4 = new User(users[3]);
//rename:
 let usersObj = [];

 if (user1.username != null) {
  usersObj.push(user1);
 };
 if (user2.username != null) {
  usersObj.push(user2);
 };
 if (user3.username != null) {
  usersObj.push(user3);
 };
 if (user4.username != null) {
  usersObj.push(user4);
 };

 console.log("usersObj:", usersObj);

 let i = 1;

 try {
  let result = await User.insertMany(usersObj);

  result.forEach(element => {
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

// DELETE ALL USERS:
async function deleteAllUsers(){
 try {
  await User.remove();
 } catch(err) {
   console.log(err);
 };
};

async function getTop10Users(){
 try {
  let result = await User.find().sort({points: -1}).limit(10);
  return result;
 } catch(err) {
  console.log(err);
 };
 
};

exports.getTop10Users = getTop10Users;

async function checkIfCurrentPlayerIsInTop10(){
 let place = 1;
 let places = [];

 try {
  let result = await getTop10Users();
  result.forEach(element => {

   if (element._id.equals(player1ID)) {
    places[0] = place;
   };
   if (element._id.equals(player2ID)) {
    places[1] = place;
   };
   if (element._id.equals(player3ID)) {
    places[2] = place;
   };
   if (element._id.equals(player4ID)) {
    places[3] = place;
   };
   place++;
  });
   return places
 } catch (e) {
  console.log(e);
 };
};



async function getAllUsers(){
 try {
  let result = await User.find({points: {$gt: 0}}).sort({points: -1});
  return result;
 } catch(err) {
  console.log(err);
 };
};

async function checkCurrentPlayerRanks(){
 let place = 1;
 //rename når usersObj også er renamed:
 let placesAndUsersObj = [];

 try {
  let result = await getAllUsers();

  result.forEach(element => {

   if (element._id.equals(player1ID)) {
    console.log("Player 1 er blandt de 10 bedste:", element._id);
    console.log("Player 1 er på plads nr:", place);
    placesAndUsersObj[0] = {place: place, user: element};
   };
   if (element._id.equals(player2ID)) {
    console.log("Player 2 er blandt de 10 bedste:", element._id);
    console.log("Player 2 er på plads nr:", place);
    placesAndUsersObj[1] = {place: place, user: element};
   };
   if (element._id.equals(player3ID)) {
    console.log("Player 3 er blandt de 10 bedste:", element._id);
    console.log("Player 3 er på plads nr:", place);
    placesAndUsersObj[2] = {place: place, user: element};
   };
   if (element._id.equals(player4ID)) {
    console.log("Player 4 er blandt de 10 bedste:", element._id);
    console.log("Player 4 er på plads nr:", place);
    placesAndUsersObj[3] = {place: place, user: element};
   };
   place++;
  });
   return placesAndUsersObj;

 } catch (e) {
  console.log(e);
 };
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

app.get('/allPlayerRanks', async function(req, res) {
 const data = await checkCurrentPlayerRanks();
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

app.get('/clearScoreboard', async function(req, res) {
 console.log("running clear on server");
 await deleteAllUsers();
 // + refresh hvis man er på scoreboard-siden, når man vælger at cleare?
});


// Denne bruges når ingen andre sider matches med ovenstående: (skal derfor stå til sidst.)
app.use((req, res) => {
 res.status(404).render('404', {title: 'Error'});
});