import { useNavigate } from "react-router-dom"

export const Header = ({children}) => {
  const navigate = useNavigate()
  return (
    <div>
        <div className='header'>
            <span className="" onClick={() => navigate('/products')}>E-commerce</span>
            <span className="material-symbols-outlined" onClick={() => navigate('/carrito')}>shopping_cart</span>
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}
