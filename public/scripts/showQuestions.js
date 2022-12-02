


// Cell row 1

let cells =  document.querySelectorAll('.first th')
        
for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function () {  test1( this.getAttribute("value")); };
}

function test1(i) {
    console.log("clicked ");

    loadQuestion(0, i);

}

// cell row 2

let cells2 = document.querySelectorAll('.second th')

for (var i = 0; i < cells2.length; i++) {
    cells2[i].onclick = function () { test2(this.getAttribute("value")); };
}

function test2(i) {
    console.log("clicked ");

    loadQuestion(1, i);

}

// cell row 3

let cells3 = document.querySelectorAll('.third th')

for (var i = 0; i < cells3.length; i++) {
    cells3[i].onclick = function () { test3(this.getAttribute("value")); };
}

function test3(i) {
    console.log("clicked ");

    loadQuestion(2, i);

}

// cell row 4

let cells4 = document.querySelectorAll('.forth th')

for (var i = 0; i < cells4.length; i++) {
    cells4[i].onclick = function () { test4(this.getAttribute("value")); };
}

function test4(i) {
    console.log("clicked ");

    loadQuestion(3, i);

}

// cell row 5

let cells5 = document.querySelectorAll('.fifth th')

for (var i = 0; i < cells5.length; i++) {
    cells5[i].onclick = function () { test5(this.getAttribute("value")); };
}

function test5(i) {
    loadQuestion(4 , i);
}

async function loadQuestion(value, categori) {

    let categorieIDs = [];

    categorieIDs.push(sessionStorage.getItem("cat1"))
    categorieIDs.push(sessionStorage.getItem("cat2"))
    categorieIDs.push(sessionStorage.getItem("cat3"))
    categorieIDs.push(sessionStorage.getItem("cat4"))
    categorieIDs.push(sessionStorage.getItem("cat5"))
    categorieIDs.push(sessionStorage.getItem("cat6"))

    console.log(categori);

    console.log(categorieIDs);

    let apiPath = `https://jservice.io/api/clues?category=${categorieIDs[categori - 1]}`;

    const response = await fetch(apiPath);

    const data = await response.json();

    console.log(data[value]);




}










console.log(document.querySelectorAll('.first th'));


