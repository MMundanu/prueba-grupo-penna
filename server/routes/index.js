var express = require('express');
const { getProducts, addCart, listCart, updateCart, removeCart, getProductsByCart, closeCart } = require('../api/apiService');
var router = express.Router();

/* GET home page. */
router.get('/getProducts/:page', getProducts);
router.post('/shoppingCart', addCart)
router.get('/shoppingCart', listCart)
router.put('/shoppingCart/:id', updateCart)
router.delete('/shoppingCart/:shoppingid/:productId', removeCart)
router.get('/getProductsByCart/:id', getProductsByCart)
router.delete('/closeCart/:id', closeCart)



module.exports = router;
