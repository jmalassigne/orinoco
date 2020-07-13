/* Variables */
let furnitureId = localStorage.getItem('furnitureToDisplay');
let pathToCall = 'http://localhost:3000/api/furniture/' + furnitureId;
let articleLocation = document.getElementById('article');

/* getting the furniture */
class Furniture {
    async getFurniture(){
        try{
            let result = await fetch(pathToCall);
            result = await result.json();
            return result;
        } catch(error){
            console.log(error);
        }
    }
}

/* Display the furniture */
class Display {
    displayFurniture(elt){
        articleLocation.innerHTML = `<div class="card">
                                        <img class="card-img-top" src=${elt.imageUrl} alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">${elt.name}</h5>
                                            <p class="card-text">${elt.description}</p>
                                            <p class="card-text">${elt.price /100} € </p>
                                            <a href="#" class="btn btn-primary">Ajouter cet article au panier</a>
                                        </div>
                                    </div>`;
        document.title = `${elt.name}`;
    }
}


document.addEventListener('DOMContentLoaded',() => {
    const display = new Display();
    const furniture = new Furniture();

    furniture.getFurniture().then(result => display.displayFurniture(result));
});



