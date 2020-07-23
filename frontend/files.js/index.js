/* Variables */
let listProducts = document.getElementById('list-products');
let bagAmount = document.getElementById('bag-amount');

/* Classes */
class Get {
    async getProducts(){
        try{
            let products = await fetch('http://localhost:3000/api/furniture');
            let data = await products.json();
            return data;
        } catch(error){
            console.error(error);
        }
    }
    getContentBag(){
            return JSON.parse(localStorage.getItem('bag'));
    }
}


class UI {
    displayProducts(products){
        products.forEach(product => {
            /* Creating elements */
            let mainDiv = document.createElement('div');
            mainDiv.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-5';

                    let article = document.createElement('article');
                    article.className = 'card border-light shadow p-3 mb-5';
                    article.setAttribute('style', 'height: 100%;');

                            let img = document.createElement('img');
                            img.className = 'card-img-top img-thumbnail';
                            img.setAttribute('src', product.imageUrl);
                            img.setAttribute('alt', 'Photo du produit');

                            let div = document.createElement('div');
                            div.className = "card-body pb-0";

                                    let h2 = document.createElement('h2');
                                    h2.classList.add('card-title');
                                    h2.textContent = product.name;

                                    let firstPara = document.createElement('p');
                                    firstPara.classList.add('card-text');
                                    firstPara.textContent = product.description;

                                    let secondPara = document.createElement('p');
                                    secondPara.classList.add('card-text');
                                    secondPara.textContent =  (product.price /100).toFixed(2) + ' €';

                            let button = document.createElement('a');
                            button.className = 'btn btn-primary mb-2 btn-article ml-2 mr-2';
                            button.setAttribute('type', 'button');
                            button.setAttribute('data-id', product._id);
                            button.textContent = 'Affichez l\'article';
                            button.setAttribute('href', './frontend/article.html?' + product._id);


            /* Adding elements to HTML */
            div.appendChild(h2);
            div.appendChild(firstPara);
            div.appendChild(secondPara);

            article.appendChild(img);
            article.appendChild(div);
            article.appendChild(button);

            mainDiv.appendChild(article);

            listProducts.appendChild(mainDiv);

        });
    }
    displayBagIcon(data){
        if(data){
            let totalOfItems = 0;
            data.forEach(item => {
                totalOfItems += item.number;
            });
            bagAmount.textContent = totalOfItems;
        } else {
            bagAmount.textContent = '0';
        }
    }
}




document.addEventListener('DOMContentLoaded', () => {
    let get = new Get;
    let ui = new UI;

    get.getProducts().then(data => {
        ui.displayProducts(data);
        ui.displayBagIcon(get.getContentBag());
    });
});

window.addEventListener('storage', () => {
    let ui = new UI;
    let get = new Get;

    ui.displayBagIcon(get.getContentBag());
})
            
            
            
            
            
            
            
            
            
