import {useState, useEffect} from 'react'
import { ListProducts } from '../components/listProducts'

export const ListProductPage = () => {

    const [page, setPage] = useState(1);
    const [productsData, setProductsData] = useState([]);

    const handlePageNext = () => {
        if(productsData.length == 5){
            setPage(page + 1)
        }
    }

    const handlePagePrevius = () => {
        if(page > 1){
            setPage(page - 1)
        }
    }
    

    const fetchData = () => {
        fetch('http://localhost:3000/getProducts/' + page)
        .then(response => {
            if(!response.ok){
                throw new Error('Error al obtener los datos')
            }
            return response.json();
        })
        .then(data => {
            setProductsData(data)
        })
        .catch(error => {
            console.error('Error de red', error);
        })

    }

    const nextPage = () => {
        if(productsData.length == 5){
            return false
        }else{
            return true
        }
    }

    useEffect(() => {
        fetchData()
    }, [page]);

  return (
    <div className='page'>
        <h1>Todos los productos</h1>
        <div>
        <ListProducts data={productsData}/>
        </div>
        <div className='navigate'>
            <button className='navigate-button' onClick={handlePagePrevius} disabled={page == 1 ? true : false} >Ant.</button>
            <span>{page}</span>
            <button className='navigate-button' onClick={handlePageNext} disabled={nextPage()} >Sig.</button>
        </div>
    </div>
  )
}
