const express = require('express');

// express app:
const app = express();

// register view engine (ejs): (kigger automatisk i views folder)
app.set('view engine', 'ejs');
// eller custom folder fx.:
//app.set('views', 'myEjsViews');



//JSON:
// const json = require('json');
const { json } = require('express');
// MONGO:
const { MongoClient, ServerApiVersion } = require('mongodb');

//mongoose:
const mongoose = require('mongoose');

// USER:
const User = require('./models/user');

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
app.listen(5500);

//Middleware and static files. static gør at filer i den tildelte mappe public kan tilgås
// http://localhost:5500/images/logo.png
app.use(express.static('public'));





app.get('/add-user', (req, res) => {
 const user = new User({
   username: 'David',
   points: 3500,
   opponent1: 'Thomas',
   opponent2: 'Julie',
   opponent3: 'Daniel'
 });

 user.save()
 .then((result) => {
  res.send(result)
 })
 .catch((err) => {
  console.log(err);
 });
});

// app.get('/all-users', (req, res) => {
//  const user = new User({
//    place: '1',
//    username: 'malene',
//    points: '1000',
//    opponent1: 'Thomas',
//    opponent2: 'David',
//    opponent3: 'Julie'
//  });
// });

//Vis alle users i db på siden /all-users:
// app.get('/all-users', (req, res) => {
//  User.find()
//   .then((result) => {
//    console.log(result);
//    res.send(result);
//    return result;
//   })
//   .catch((err) => {
//    console.log(err);
//   });
// });

async function getTop10Users(){
 try {
  let result = await User.find().sort({points: -1}).limit(10);
   // return JSON.stringify(result);
   console.log(result);
   return result;
 } catch(err) {
   console.log(err);
 };
};

getTop10Users();


 
app.get('/', (req, res) => {
 res.render('index', {title: 'Forside'});
});

app.get('/tableVeiw', (req, res) => {
    res.render('tableVeiw', { title: 'tableVeiw' });
});

app.get('/gamemenu', (req, res) => {
 res.render('gamemenu', {title: 'gamemenu'});
});

app.get('/temp', (req, res) => {
 res.render('temp', {title: 'temp'});
});

// Denne bruges når ingen andre sider matches med ovenstående: (skal derfor stå til sidst.)
app.use((req, res) => {
 res.status(404).render('404', {title: 'Error'});
});
