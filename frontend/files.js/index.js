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
            result += ` <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
                            <article class="card border-light shadow p-3 mb-5" style='height: 100%'>
                                <img class="card-img-top img-thumbnail" src=${elt.imageUrl} alt="photo du produit">
                                <div class="card-body pb-0">
                                    <h2 class="card-title">${elt.name}</h2>
                                    <p class="card-text"><em>${elt.description}</em></p>
                                    <p class="card-text h3">${elt.price / 100} €</p>
                                </div>
                                <a type="button" href="frontend/article.html" class="btn btn-primary mb-2 btn-article ml-2 mr-2" data-id="${elt._id}">Voir l'article</a>
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

/* Save the furniture to display in the article page */
class ArticleDisplay {
    static furnitureToDisplayInArticlePage() {
        let articles = document.querySelectorAll('article');
        articles.forEach(article => {
            let button = article.querySelector('a');
            button.addEventListener('click', function(e){
                let idToSave = this.getAttribute('data-id');
                localStorage.setItem('furnitureToDisplay', idToSave);
            })
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const display = new Display();
    const furnitures = new Furnitures();


    furnitures.getFurnitures().then(furnitures =>{
        display.displayFurnitures(furnitures);
        Storage.savePurchase(furnitures);
        ArticleDisplay.furnitureToDisplayInArticlePage();
    }); 
})






