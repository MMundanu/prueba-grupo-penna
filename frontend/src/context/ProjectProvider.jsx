import { createContext, useEffect, useState } from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [cart, setCart] = useState(undefined);

  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getCart = () => {
    fetch("http://localhost:3000/shoppingCart")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const getCartProducts = () => {
    if (!cart) return;

    fetch("http://localhost:3000/getProductsByCart/" + cart.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setCartProducts(data);
      })
      .catch((error) => {
        console.error("Error de red:", error);
      })

  };

  const createCart = (id) => {
    if (!cart) {
        setIsLoading(true)
      fetch("http://localhost:3000/shoppingCart", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los datos");
          }
          return response.json();
        })
        .then((data) => {
          setCart(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error de red:", error);
        })
        .finally(() => setIsLoading(false))
    }
  };

  const updateCart = (id) => {
    if (cart) {
        setIsLoading(true)
      fetch("http://localhost:3000/shoppingCart/" + cart.id, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los datos");
          }
          return response.json();
        })
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.error("Error de red:", error);
        })
        .finally(() => setIsLoading(false))
    }
  };
  const removeCart = (id) => {
    if (cart) {
        setIsLoading(true)
      fetch("http://localhost:3000/shoppingCart/" + cart.id + '/' + id, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los datos");
          }
          return response.json();
        })
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.error("Error de red:", error);
        }).finally(() => setIsLoading(false))
    }
}
const deleteCart = (id) => {
    if (cart) {
        setIsLoading(true)
      fetch("http://localhost:3000/closeCart/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los datos");
          }
          return response.json();
        })
        .then((data) => {
          setCart(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error de red:", error);
        })
        .finally(() => setIsLoading(false))
    }
  };
  

  useEffect(() => {
    if (!isLoading) {
      getCart();
    }
  }, [isLoading]);

  useEffect(() => {
    if(!isLoading){
    getCartProducts();
    }
  }, [cart, isLoading]);

  return (
    <ProjectsContext.Provider
      value={{
        cart,
        getCart,
        cartProducts,
        getCartProducts,
        createCart,
        updateCart,
        removeCart,
        isLoading,
        deleteCart
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
