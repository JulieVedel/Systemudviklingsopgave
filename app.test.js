// man må ikke bruge import
// const {funktionsnavn} = require('./filnavn hvor funktionen er')
const {myAdd} = require('./app');
const {myMultiply} = require('./app');
const {myAddAndMultiply} = require('./app');
const {getTop10Users} = require('./app');

const puppeteer = require('puppeteer');
const { default: mongoose } = require('mongoose');


// description i parenteser:
test('test myAdd', () => {
 const add = myAdd(4,6);
 expect(add).toBe(10);
});

test('test myMultiply', () => {
 const multi = myMultiply(4,6);
 expect(multi).toBe(24);
});


//Integration test:
//Test på flere unit tests
//Opret funktion i app.js, som indeholder flere små funktioner
//I dette tilfælde behøver vi ikke exports for de to første funktioner, da den samlede funktion indeholder ref til dem
test('test myAddAndMultiply', () => {
 const addAndMulti = myAddAndMultiply(4,6);
 expect(addAndMulti).toBe(34);
});


test('test getTop10Users', async() => {
 let top10 = await getTop10Users();
 mongoose.connection.close();
 top10 = top10.length;
 expect(top10).toBeGreaterThan(0);
}, 10000);
// 10000 timeout for test i millisekunder



//puppeteer 29:00:
// npm i --save-dev pupetteer

test('clicking', async () => {
 const browser = await puppeteer.launch({
  headless: false,
  slowMo: 80,
  args: ['--window-size=1600, 1000'],
  defaultViewport: {width: 1900, height: 1080}
 });
 const page = await browser.newPage();
 await page.goto('http://localhost:3000/gamemenu');

 await page.click('input#spiller1');
 await page.type('input#spiller1', 'Daniel');

 await page.click('label#buzzer1Label');

 await page.keyboard.press('Space');
 


 // await page.setViewport({ width: 600, height: 400 })

}, 20000);