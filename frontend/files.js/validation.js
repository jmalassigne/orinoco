
/* Variables */
let form = document.getElementById('form');
let inputs = [...document.getElementsByTagName('input')];
let cityInput = document.getElementById('city');
let cityList = document.getElementById('city-list');
let listOfProducts = JSON.parse(localStorage.getItem('bag'));


class UI {
    displayList(data){
        if(cityList.classList.contains('d-none')){
            cityList.classList.remove('d-none');
        }
        cityList.innerHTML = '';
        data.forEach(element => {

            let button = document.createElement('button');
            button.className = 'btn p-0 text-left border-0';

            let li = document.createElement('li');
            li.className = 'list-group-item border-top-0 border-right-0 border-left-0 rounded-0';
            li.textContent = element.nom;

            button.addEventListener('click', (e) => {
                cityInput.value = e.target.textContent;
                cityList.classList.add('d-none');
            })

            button.appendChild(li);

            cityList.appendChild(button);
        });
    }
    async completeCity(){
        let path = "https://geo.api.gouv.fr/communes?nom="+ cityInput.value + "&boost=population&limit=5"
        let request = await fetch(path);
        let data = await request.json();
        return data;
    }
}

class Check {
    isValid(input){
        const id = input.id;
        const value = input.value;
        switch(id){
            case 'forename': 
                return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);

            case 'last-name':
                return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);

            case 'email': 
                return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value);
                ;

            case 'address':
                return /^[#.0-9a-zA-Z\s,-]+$/.test(value);

            case 'city':
                return /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(value);
            
        }
        
        
    }
    formControl(){
        let response =true;
        inputs.forEach(input => {
            if((!this.isValid(input)))
            response = false;
        });
        return response;
    }
}


class POST {
    bodyRequest(){
        let contact = {firstName: document.getElementById('forename').value,
                        lastName: document.getElementById('last-name').value,
                        address: document.getElementById('address').value,
                        city: document.getElementById('city').value,
                        email: document.getElementById('email').value};

        let products = [];
        listOfProducts.forEach(product => {
            products.push(product.id);
        });

        let body = {contact: contact, products: products};

        return body;
    }

    async sendRequest(body){
        const request = await fetch('http://localhost:3000/api/furniture/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const response = await request.json();

        return response;
    }
}

class Storage {
    static saveRequest(data){
        let commande = JSON.stringify(data);
        localStorage.setItem('order', commande);

        localStorage.removeItem('bag');
    }
}




cityInput.addEventListener('input', () => {
    let ui = new UI;

    ui.completeCity().then(data => {
        ui.displayList(data);
    })
    
    
})


form.addEventListener('submit', (e) => {
    let post = new POST;
    let check = new Check;

    e.preventDefault();


    if(check.formControl()){

        post.sendRequest(post.bodyRequest())
            .then(response => {
                Storage.saveRequest(response);
                window.location.href = './confirmation.html'
        });
    };

});




