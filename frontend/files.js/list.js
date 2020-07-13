/* Variables */
const listFurnitures = document.getElementById('list-furnitures');

/* getting the furnitures */
class Furnitures {
 async getFurnitures(){
     try {
        let result = await fetch('http://localhost:3000/api/furniture');
        let furnitures = await result.json();
        return furnitures;
     } catch(error){
         console.log(error);
     }
 }
}

/* Display furnitures */
class Display {
    displayFurnitures(furnitures){
        let result = '';
        furnitures.forEach(elt => {
            result += ` <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
                            <article class="card border-secondary">
                                <img class="card-img-top" src=${elt.imageUrl} alt="photo du produit">
                                <div class="card-body">
                                    <h2 class="card-title">${elt.name}</h2>
                                    <p class="card-text"><em>${elt.description}</em></p>
                                    <p class="card-text h3">${elt.price / 100} €</p>
                                </div>
                                <a type="button" href="frontend/article.html" class="btn btn-primary mb-2 btn-article" data-id="${elt._id}">Voir l'article</a>
                            </article>
                        </div>`
        });
        listFurnitures.innerHTML= result;
    }
}

/* LocalStorage */
class Storage {
   static savePurchase(furnitures){
        localStorage.setItem('furnitures', JSON.stringify(furnitures));
   }
}

document.addEventListener('DOMContentLoaded', () => {
    const display = new Display();
    const furnitures = new Furnitures();


    furnitures.getFurnitures().then(furnitures =>{
        display.displayFurnitures(furnitures);
        Storage.savePurchase(furnitures);
    }); 
})




