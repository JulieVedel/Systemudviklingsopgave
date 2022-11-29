

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

getSessionCategories();


