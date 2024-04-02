const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'),'utf-8'))
}


const loadCarts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'cart.json'),'utf-8'))
}

const storeCarts = (carts) => {
    fs.writeFileSync(path.join(__dirname,'cart.json'), JSON.stringify(carts, null, 3),'utf8')
}

module.exports= {
    loadProducts,
    loadCarts,
    storeCarts
}