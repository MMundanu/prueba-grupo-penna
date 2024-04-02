import PropTypes from "prop-types";
import useProjects from "../hooks/useProjects";

export const ListProducts = ({ data }) => {
  const { cart, createCart, updateCart, removeCart } = useProjects();

  const handleAdd = (id) => {
    if (!cart) {
      return createCart(+id);
    } else {
      return updateCart(+id);
    }
  };

  const handleRemove = (id) => {
    removeCart(id)
    if(data.length == 0){
      window.location.reload()
    }
  }

  return (
    <div className="conteiner-cards">
      {data.map((d) => (
        <div className="card" key={d.id}>
          <div className="conteiner-img">
            {d.quantity ? (
              <div className="items">{d.quantity}</div>
            ) : (
              <div className="cart-icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleAdd(d.id)}
                >
                  add_shopping_cart
                </span>
              </div>
            )}
            {d.quantity && (
              <div className="delete">
                <span onClick={() => handleRemove(d.id)} className="material-symbols-outlined">delete</span>
              </div>
            )}
            <img src={d.imagen} alt={d.imagen} />
          </div>
          <span className="">{d.nombre}</span>
        </div>
      ))}
    </div>
  );
};

ListProducts.propTypes = {
  data: PropTypes.array.isRequired,
};
