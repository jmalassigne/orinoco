const id = document.getElementById('id');
const amount = document.getElementById('amount');
let btn = document.getElementById('btn');



const getData = () => {
    const bag = JSON.parse(localStorage.getItem('order'));
    const orderId = bag.orderId;
    let total = 0;
    const products = bag.products;

    products.forEach(product => {
        total += product.price
    });
    return {
        id: orderId,
        total: (total / 100).toFixed(2)
    }
};


const display = (data) => {
    id.innerHTML = data.id;
    amount.innerHTML =data.total + ' €';
};



btn.addEventListener('click', () => {
    localStorage.removeItem('order');
    window.location.href = '../index.html';
})


document.addEventListener('DOMContentLoaded', () => {
    display(getData());
})