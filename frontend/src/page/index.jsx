import { useNavigate } from "react-router-dom"

export const Index = () => {
   const navigate = useNavigate()
  return (
    <div className="page">
        <h1 className="">Bienvenido</h1>
        <button className="start" onClick={() => navigate('/products')}>Empecemos</button>
    </div>
  )
}
