const { loadProducts, loadCarts, storeCarts } = require("../db/db_Module")

const getProducts = (req, res) => {

    try {
        const page = +req.params.page;
        const products = loadProducts();
        const perPage = 5;
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;

        const productsToRender = [];

        for (let i = startIndex; i < Math.min(endIndex, products.length); i++) {
            productsToRender.push(products[i]);
        }

        res.json(productsToRender);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }



}
const addCart = (req, res) => {
    try {
        const carts = loadCarts();
        const products = loadProducts();
        const { id } = req.body;

        const cartsPendiente = carts.find((c) => c.status == 'pendiente')

        if (!id) throw new Error('Debes agregar al menos un producto')

        if (!cartsPendiente) {
            if (id) {
                const productsCart = products.find((p) => p.id == +id);

                if (!productsCart) throw new Error('No se encuentra el producto en la base de datos');
            }

            console.log(id);
            const newCart = {
                id: carts.length + 1,
                status: 'pendiente',
                products: [{ id: +id, quantity: 1 }]
            };
            storeCarts([...carts, newCart]);
            res.json(newCart);
        }
        else throw new Error('Ya existe un carrito en uso')


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const listCart = (req, res) => {
    try {
        const carts = loadCarts();

        const cartPendientes = carts.find((c) => c.status == 'pendiente');

        if (cartPendientes) {

            res.json(cartPendientes)
        } else {
            res.json(undefined)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const updateCart = (req, res) => {
    try {
        const idCart = +req.params.id;
        const carts = loadCarts();
        const products = loadProducts();
        const { id } = req.body;


        const cartToUpdate = carts.find((c) => c.id == idCart)

        if (!cartToUpdate) throw new Error('No existe el carrito a editar')

        if(cartToUpdate.status == "terminado")throw new Error('El carrito ya se encuantra en estado terminado')


        if (!id) throw new Error('Debes agregar al menos un producto')

        const productsCart = products.find((p) => p.id == +id);

        if (!productsCart) throw new Error('No se encuentra en la base de datos');

        if (cartToUpdate.products.some(item => item.id == +id)) {
            const newCartList = carts.map((c) => {
                if (c.id == idCart) {
                    return {
                        ...c,
                        products: c.products.map((p) => {
                            if (p.id == +id) {
                                return {
                                    ...p,
                                    quantity: p.quantity + 1
                                }
                            }
                            return p
                        })
                    }
                }
                return c
            })
            storeCarts(newCartList);

            res.json(newCartList.find((c) => c.id == idCart));
        } else {
            const newCartList = carts.map((c) => {
                if (c.id == idCart) {
                    return {
                        ...c,
                        products: [...c.products, {
                            id: +id,
                            quantity: 1
                        }]
                    }
                }
                return c
            })

            storeCarts(newCartList);
            res.json(newCartList.find((c) => c.id == idCart));
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const removeCart = (req, res) => {

    try {
        const shoppingid = +req.params.shoppingid;
        const productId = +req.params.productId;
        const carts = loadCarts();

        const cartToUpdate = carts.find((c) => c.id == shoppingid)

        if (!cartToUpdate) throw new Error('No existe el carrito a editar')

        if(cartToUpdate.status == "terminado")throw new Error('El carrito ya se encuantra en estado terminado')

        const cartList = carts.map((c) => {
            if (c.id == shoppingid) {
                const productToRemove = c.products.filter(cp => cp.id != productId);
                const productToUpdate = c.products.find((cp) => cp.id == productId)

                if(!productToUpdate) throw new Error('No existe el producto dentro del carrito')

                if (productToUpdate.quantity > 1) {
                    const cartToPrint = {
                        ...c,
                        products: c.products.map((cp) => {
                            if (cp.id == productToUpdate.id) {
                                return {
                                    ...cp,
                                    quantity: cp.quantity - 1
                                }
                                
                            }
                            return cp
                        })
                    }
                    res.json(cartToPrint)
                    return cartToPrint
                }
                else if (productToUpdate.quantity == 1) {
                    if(productToRemove.length > 0){
                        const cartToPrint = {
                            ...c,
                            products: productToRemove
                        }
                        res.json(cartToPrint)
                    return cartToPrint
                }
                    else{
                        res.json(undefined)
                        return {
                            ...c,
                            status: 'terminado',
                            products: productToRemove
                        }
                    }
                } 
               
            }
            return c
        })

        storeCarts(cartList);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }


}
const getProductsByCart = (req, res) => {
    try {
        const carts = loadCarts();
        const products = loadProducts();
        const id = +req.params.id

        const cart = carts.find((c) => c.id == id);

        if (cart) {

            const productsToRender = products.filter((p) => {
                const cartProduct = cart.products.find(cp => cp.id == p.id);
                if (cartProduct) {
                    p.quantity = cartProduct.quantity;
                    return true;
                }
                return false;
            });

            res.json(productsToRender)
        } else {
            res.json(undefined)
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const closeCart = (req,res) => {
    try {
        const carts = loadCarts();
        const id = +req.params.id

        const cartToClose = carts.find((c) => c.id == id)

        if(!cartToClose) throw new Error('No se encontro el carrito a cerrar')

        const cartsFilters = carts.filter((c) => c.id != id)

        const cartClose = {
            ...cartToClose,
            status: 'terminado'
        }

        storeCarts([...cartsFilters, cartClose])

        res.json(undefined)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



module.exports = {
    getProducts,
    addCart,
    listCart,
    updateCart,
    removeCart,
    getProductsByCart,
    closeCart
}