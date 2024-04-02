
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProjectsProvider } from './context/ProjectProvider'
import { Index } from './page'
import { ListProductPage } from './page/list-product-page'
import { Header } from './components/header'
import { CartPage } from './page/cart-page'

function App() {

  return (
    <BrowserRouter>
    <ProjectsProvider>
      <Header>
      <Routes>
      <Route index path="/" element={<Index />}/>
      <Route  path="/products" element={<ListProductPage />}/>
      <Route  path="/carrito" element={<CartPage />}/>

      </Routes>
      </Header>
    </ProjectsProvider>
    </BrowserRouter>
  )
}

export default App
