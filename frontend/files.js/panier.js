/* Variables */
let container = document.getElementById('container');
let bagAmount = document.getElementById('bag-amount');

/* Functions */

const setAttributes = (elt, attrs) => {
    for(let key in attrs){
        elt.setAttribute(key, attrs[key]);
    }
}

/* Classes */
class Get {
    async getProduct(id){
        let path = 'http://localhost:3000/api/furniture/' + id;
        try {
            let product = await fetch(path);
            product = product.json();
            return product;
        } catch(error){
            console.error(error);
        }
    }
}

class UI {
    static displayNothing(){
        container.innerHTML = '';

        let listGroupItem = document.createElement('div');
        setAttributes(listGroupItem, {'class':"list-group-item d-flex justify-content-center"});

        let h3 = document.createElement('h3');
        setAttributes(h3, {'class': "text-warning"});
        h3.textContent = 'Veuillez ajouter des articles au panier.';

        listGroupItem.appendChild(h3);

        container.appendChild(listGroupItem);
    }
    displayBagIcon(){
        let bagContent = Storage.getBag();
        if(bagContent){
            let totalOfItems = 0;
            bagContent.forEach(item => {
                totalOfItems += item.number;
            });
            bagAmount.textContent = totalOfItems;
        } else {
            bagAmount.textContent = 0;
        }
    }
    displayTitle(){
        let bagContent = Storage.getBag();
        if(bagContent){
            let totalOfItems = 0;
            bagContent.forEach(item => {
                totalOfItems += item.number;
            });
            document.title = 'Votre panier (' + totalOfItems + ')';
        } else {
            document.title = 'Votre panier (0)';
        }
    }
    diplayTotalListItem(){
        let mainDiv = document.createElement('div');
        setAttributes(mainDiv, {'class': 'list-group-item bg-light d-flex justify-content-between align-items-center', 'id': 'total-list-item'});

                let divAmount = document.createElement('div');
                setAttributes(divAmount, {'class': 'd-flex'})

                        let text = document.createElement('p');
                        setAttributes(text, {'class': 'mb-0'});
                        text.innerHTML = 'Montant total :&nbsp; ';

                        let totalAmount = document.createElement('span');
                        setAttributes(totalAmount, {'id': 'total-amount', 'class': 'text-primary'})


                let button = document.createElement('a');
                setAttributes(button, {'class': "btn btn-primary", 'href': 'validation.html'});
                button.textContent = 'Validez la commande';
                

        divAmount.appendChild(text);
        divAmount.appendChild(totalAmount);

        mainDiv.appendChild(divAmount);
        mainDiv.appendChild(button);

        container.appendChild(mainDiv);
    }
    displayProduct(product){
        let totalListItem = document.getElementById('total-list-item');
        let bagItem = Storage.getItem(product._id);
        
        /* Creating elements */
        let listGroupItem = document.createElement('div');
        setAttributes(listGroupItem, {'class':"list-group-item d-flex p-0", 'id': product._id});
        
                let divImg = document.createElement('div');
                setAttributes(divImg, {'class': "border-right p-2 d-none d-sm-block"});

                        let img = document.createElement('img');
                        setAttributes(img, {'src': product.imageUrl, 'class':"rounded", 'style':"height: 80px; width: 80px;"})

                let divInfos = document.createElement('div');
                setAttributes(divInfos, {'class': "p-2 d-inline-flex flex-column justify-content-center w-50"});

                        let h6 = document.createElement('h6');
                        h6.textContent = product.name;

                        let small = document.createElement('small');
                        setAttributes(small, {'class':"d-none d-sm-inline"});
                        small.textContent = product.description;

                let divQuantity = document.createElement('div');
                setAttributes(divQuantity, {'class': "ml-auto border-left p-2 d-flex align-items-center justify-content-center w-25"});

                        let decrement = document.createElement('button');
                        setAttributes(decrement, {'class': "fas fa-less-than btn btn-light text-primary border-primary p-1 mr-1", 'type': "button"});

                        let quantity = document.createElement('span');
                        setAttributes(quantity, {'class': 'quantity', 'data-id': product._id});

                        let increment = document.createElement('button');
                        setAttributes(increment, {'class': "fas fa-greater-than btn btn-light text-primary border-primary p-1 ml-1", 'type': "button"});

                let divPrice = document.createElement('div');
                setAttributes(divPrice, {'class': "border-left p-2 d-flex align-items-center justify-content-center w-25"});

                        let price = document.createElement('small');
                        setAttributes(price, {"data-price": product.price, 'class': 'price'});

                        let euroSymbol = document.createElement('small');
                        setAttributes(euroSymbol, {'class': "mb-0"});
                        euroSymbol.innerHTML = '&nbsp;€';

        /* Creating functionalities */
        this.displayQuantity(quantity, bagItem);
        this.displayPrice(price, quantity);

        decrement.addEventListener('click', () => {        
        
                Storage.refreshItem(Storage.getItem(product._id), 'decrease');
                
                let quantity = decrement.parentElement.getElementsByClassName('quantity')[0];
                
                this.displayQuantity(quantity, Storage.getItem(product._id));
                this.displayPrice(price, quantity);
                this.displayTotalAmount();
                this.displayTitle();
                this.displayBagIcon();            
        })

        increment.addEventListener('click', () => {
            Storage.refreshItem(bagItem, 'increase');

            let quantity = increment.parentElement.getElementsByClassName('quantity')[0];

            this.displayQuantity(quantity, Storage.getItem(product._id));
            this.displayPrice(price, quantity);
            this.displayTotalAmount();
            this.displayTitle();
            this.displayBagIcon();
        })


        /* Adding elements to the HTML */
        divPrice.appendChild(price);
        divPrice.appendChild(euroSymbol);

        divQuantity.appendChild(decrement);
        divQuantity.appendChild(quantity);
        divQuantity.appendChild(increment);
    
        divInfos.appendChild(h6);
        divInfos.appendChild(small);

        divImg.appendChild(img);

        listGroupItem.appendChild(divImg);
        listGroupItem.appendChild(divInfos);
        listGroupItem.appendChild(divQuantity);
        listGroupItem.appendChild(divPrice);

        container.insertBefore(listGroupItem,totalListItem);

        this.displayTotalAmount();
    }
    displayQuantity(elt, item){
        if(item){
            elt.textContent = item.number;
        } else {
            elt.textContent = 0;
        }
    }
    displayPrice(price, quantity){
        let priceValue = parseInt(price.dataset.price, 10);
        let quantityValue = parseInt(quantity.textContent, 10);
        price.textContent = ((priceValue * quantityValue) / 100).toFixed(2);
    }
    displayTotalAmount(){
        let allPrices = [...document.getElementsByClassName('price')];
        let totalAmountLocation = document.getElementById('total-amount');
        if(totalAmountLocation){
            let totalAmount = 0;
    
            allPrices.forEach(item => {
                totalAmount += parseInt(item.textContent, 10);
            })
            
            totalAmountLocation.textContent = totalAmount.toFixed(2) + ' €';
        }
    }
    static removeProduct(id){
        let product = document.getElementById(id);
        container.removeChild(product);
    }
}


class Storage {
    static getBag(){
        return localStorage.getItem('bag')? JSON.parse(localStorage.getItem('bag')): false;
    }
    static getItem(id){
        if(localStorage.getItem('bag')){
            let bag = JSON.parse(localStorage.getItem('bag'));
            let item = bag.find(item => item.id === id);
            return item;
        } else {
            return false;
        }
    }
    static refreshItem(item, order){
        let bagContent = this.getBag();
        if(order === 'decrease'){
            if(item.number === 1){
                let itemToRemove = bagContent.find(product => product.id === item.id);
                let i = bagContent.indexOf(itemToRemove);
                bagContent.splice(i, 1);
                if(bagContent.length > 0){
                    this.setBag(bagContent);
                    UI.removeProduct(item.id);
                } else {
                    localStorage.removeItem('bag');
                    UI.removeProduct(item.id);
                    UI.displayNothing();
                }
                
            } else {
                let itemToRefresh = bagContent.find(product => product.id === item.id);
                itemToRefresh.number = itemToRefresh.number - 1;
                this.setBag(bagContent);
            }
        } 
        if(order === 'increase'){
            let itemToRefresh = bagContent.find(product => product.id === item.id);
            itemToRefresh.number = itemToRefresh.number + 1;
            this.setBag(bagContent);

        }
    }
    static setBag(bag){
        localStorage.setItem('bag', JSON.stringify(bag));
    }
}






document.addEventListener('DOMContentLoaded', () => {
    let get = new Get;
    let ui = new UI;

    ui.displayTitle();
    ui.displayBagIcon();

    let bagContent = Storage.getBag();

    if(!bagContent){

        UI.displayNothing();

    } else {
        ui.diplayTotalListItem();
            bagContent.forEach(item => {
                let id = item.id;
                get.getProduct(id).then(product => {
                    ui.displayProduct(product);
                });
        })
    }
});


window.addEventListener('storage', () => {
    let get = new Get;
    let ui = new UI;

    container.innerHTML = '';

    ui.displayTitle();
    ui.displayBagIcon();

    let bagContent = Storage.getBag();

    if(!bagContent){

        UI.displayNothing();

    } else {
        ui.diplayTotalListItem();
            bagContent.forEach(item => {
                let id = item.id;
                get.getProduct(id).then(product => {
                    ui.displayProduct(product);
                });
        })
    }
});




