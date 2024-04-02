//import { useEffect, useState } from "react";
import { ListProducts } from "../components/listProducts"
import useProjects from "../hooks/useProjects";

export const CartPage = () => {

    const {cartProducts, isLoading, deleteCart, cart} = useProjects()

    const handleDelete =() => {
        deleteCart(cart.id)
        window.location.reload()
    }

  return (
    <div className="page">
        <h1>Carrito</h1>
     
            <h2>Productos agregados:</h2>
            {
                isLoading && (
                    <span>Cargando...</span>
                )
            }
            {
               !isLoading && cartProducts.length > 0 ? (
                    <div className="page">
                <ListProducts data={cartProducts} />
                <button className="start" onClick={() => handleDelete()}>Eliminar Carrito</button>
            </div>
                ) : (
                    <div>
                <h2>No hay productos agregados al carrito</h2>
            </div>
                )
            }
            
    </div>
  )
}
