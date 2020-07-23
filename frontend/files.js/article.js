/* Variables */
let articleLocation = document.getElementById('article');
let bagAmount = document.getElementById('bag-amount');

/* Functions */
const setAttributes = (el, attrs) => {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

/* Classes*/
class Get {
    getParameters(){
        return window.location.search.substring(1);
    }

    async getProduct(id){
        let path = 'http://localhost:3000/api/furniture/' + id;
        try{
            let product = await fetch(path);
            product = await product.json();
            return product;
        }catch(error){
            console.error(error);
        }
    }
}


class UI {
    displayProduct(product){
        /* Creating elements */
        let card = document.createElement('article');
        setAttributes(card, {'class': 'card'});

                let img = document.createElement('img');
                setAttributes(img, {'src': product.imageUrl, 'class': 'card-img-top', 'alt': 'Photo du produit'});

                let cardBody = document.createElement('div');
                setAttributes(cardBody, {'class': 'card-body'});

                        let h5 = document.createElement('h5');
                        setAttributes(h5, {'class': 'card-title'});
                        h5.textContent = product.name;

                        let description = document.createElement('p');
                        setAttributes(description, {'class': 'card-text'});
                        description.textContent = product.description;

                        let price = document.createElement('p');
                        setAttributes(price, {'class': 'card-text'});
                        price.textContent = (product.price / 100).toFixed(2) + ' €';

                        let form = document.createElement('form');

                                let formGroup = document.createElement('div');
                                setAttributes(formGroup, {'class': 'form-group'});

                                        let label = document.createElement('label');
                                        setAttributes(label, {'for': 'varnish'});
                                        label.textContent = 'Vernis: ';

                                        let select =document.createElement('select');
                                        setAttributes(select, {'class': "form-control", 'id': "varnish"});

                        let btn = document.createElement('button');
                        setAttributes(btn, {'class':"btn btn-primary", 'id': "button", 'data-id': product._id});
                        let productAlreadyInBag = Storage.getBag().find(item => item.id === product._id);
                        if(productAlreadyInBag){
                            btn.textContent = 'Déjà ajouté au panier';
                            btn.disabled = true;
                        } else {
                            btn.textContent = 'Ajoutez le produit au panier';
                        }
                        

        /* Adding event listeners */

        btn.addEventListener('click', () => {
            btn.disabled = true;
            btn.textContent = 'Déjà ajouté au panier';

            let bag = Storage.getBag();
            let id = btn.dataset.id;
            let itemToAdd = {id, number: 1};
            bag = [...bag, itemToAdd];
            Storage.setBag(bag);

            this.displayBagIcon(Storage.getBag());
        })

        /* Adding elements to HTML */
        product.varnish.forEach(varnish => {
            let option = document.createElement('option');
            option.textContent = varnish;
            setAttributes(option, {'value': varnish})
            select.appendChild(option);
        });

        formGroup.appendChild(label);
        formGroup.appendChild(select);

        form.appendChild(formGroup);

        cardBody.appendChild(h5);
        cardBody.appendChild(description);
        cardBody.appendChild(price);
        cardBody.appendChild(form);
        cardBody.appendChild(btn);

        card.appendChild(img);
        card.appendChild(cardBody);

        articleLocation.appendChild(card);

        /* Change title */
        document.title = product.name;
    }
    displayBagIcon(data){
        if(data){
            let totalOfItems = 0;
            data.forEach(item => {
                totalOfItems += item.number
            })
            bagAmount.innerHTML = totalOfItems;
        } else {
            bagAmount.innerHTML = 0;
        }
    }
}

class Storage {
    static setBag(bag){
       localStorage.setItem('bag', JSON.stringify(bag))
    }
    static getBag(){
        return localStorage.getItem('bag')? JSON.parse(localStorage.getItem('bag')): []; 
    }
}


document.addEventListener('DOMContentLoaded', () => {
    let get = new Get;
    let ui = new UI;

    get.getProduct(get.getParameters())
        .then(data => {
            ui.displayProduct(data);
            ui.displayBagIcon(Storage.getBag());
        });
});

window.addEventListener('storage', () => {
    let ui = new UI;

    ui.displayBagIcon(Storage.getBag());
})



























