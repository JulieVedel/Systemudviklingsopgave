


function getSessionCategories() {
    
    console.log(sessionStorage.getItem("cat1"));
    console.log(sessionStorage.getItem("cat1name"));

    let categorie = [];

    categorie.push(sessionStorage.getItem("cat1name"))
    categorie.push(sessionStorage.getItem("cat2name"))
    categorie.push(sessionStorage.getItem("cat3name"))
    categorie.push(sessionStorage.getItem("cat4name"))
    categorie.push(sessionStorage.getItem("cat5name"))
    categorie.push(sessionStorage.getItem("cat6name"))


    console.log(categorie);

    let catH = document.getElementById("kategori");

    console.log(catH);

    catH.innerHTML = "";

    for (let i = 0; i < categorie.length; i++) {
        catH.innerHTML += `<th>${categorie[i]}</th>`;
    };

}

function getPlayerNames() {

    let playerNames = [];

    for (let i = 1; i < 5; i++) {
        if (sessionStorage.getItem("player" + i) != null){
            playerNames.push(sessionStorage.getItem("player" + i));
        }
    };

    return playerNames;

}

function getBuzzerKeys() {
    let buzzerKeys = [];

    for (let i = 1; i < 5; i++) {
        if (sessionStorage.getItem("buzzer" + i + "Label") != null) {
            buzzerKeys.push(sessionStorage.getItem("buzzer" + i + "Label"));
        }
    };


    
    return buzzerKeys;

}


function pupulatePlayerNamesAndStartSelectPlayer() {
    
    let playernames = getPlayerNames()
    let buzzerKeys = getBuzzerKeys();

    let names = [];

    // -------- refactor eksempel --------// 

    names[0] = document.querySelector("#card1 .name p")
    names[1] = document.querySelector("#card2 .name p")
    names[2] = document.querySelector("#card3 .name p")
    names[3] = document.querySelector("#card4 .name p")

    let cards = []

    cards[0] = document.getElementById("card1")
    cards[1] = document.getElementById("card2")
    cards[2] = document.getElementById("card3")
    cards[3] = document.getElementById("card4")

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("card-hide");
        
    }

    buzzers = [];

    buzzers[0] = document.querySelector("#card1 .button p")
    buzzers[1] = document.querySelector("#card2 .button p")
    buzzers[2] = document.querySelector("#card3 .button p")
    buzzers[3] = document.querySelector("#card4 .button p")

    for (let i = 0; i < playernames.length; i++) {

        cards[i].classList.remove("card-hide");
        names[i].innerHTML = playernames[i];
        buzzers[i].innerHTML = buzzerKeys[i].toUpperCase();

    }

    const randomNumber = Math.round(Math.random() * (getPlayerNames().length - 1));
    cards[randomNumber].classList.add("card-selected");

}





getSessionCategories();
pupulatePlayerNamesAndStartSelectPlayer();



