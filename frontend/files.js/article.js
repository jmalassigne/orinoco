/* Variables */
let furnitureId = localStorage.getItem('furnitureToDisplay');
let pathToCall = 'http://localhost:3000/api/furniture/' + furnitureId;
let articleLocation = document.getElementById('article');
let contentBag = {};

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
                                            <form>
                                                <div class="form-group">
                                                    <label for="varnish">Vernis: </label>
                                                    <select class="form-control" id="varnish">
                                                        
                                                    </select>
                                                </div>
                                            </form>
                                            <button class="btn btn-primary" id="button" data-id="${elt._id}">Ajouter cet article au panier</button>
                                        </div>
                                    </div>`;

        elt.varnish.forEach(element => {
            let option = document.createElement('option');
            option.innerHTML = element;
            document.getElementById('varnish').appendChild(option);
        });
        
        document.title = `${elt.name}`;
    }
}

class Bag {
    getButton(){
        return button = document.getElementById('button');
    }

    addToTheBag(){
        button.addEventListener('click', (e) => {
            let purchaseId = e.target.getAttribute('data-id');
            if(localStorage.getItem('bag')){
                console.log('ok')
            } else {
                localStorage.setItem('bag', contentBag);
            }
        })
    }
}

document.addEventListener('DOMContentLoaded',() => {
    let bag = new Bag;
    const display = new Display;
    const furniture = new Furniture;

    furniture.getFurniture().then(result => 
        display.displayFurniture(result)).then(() => {
            bag.getButton();
            bag.addToTheBag();
        });
});



