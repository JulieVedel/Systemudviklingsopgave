const express = require('express');

// express app:
const app = express();

// register view engine (ejs): (kigger automatisk i views folder)
app.set('view engine', 'ejs');
// eller custom folder fx.:
//app.set('views', 'myEjsViews');

//listen for req: (localhost assumed)
app.listen(5500);

//Middleware and static files. static gør at filer i den tildelte mappe public kan tilgås
// http://localhost:5500/images/logo.png
app.use(express.static('public'));
 
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
