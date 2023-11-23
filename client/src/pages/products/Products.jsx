import { useEffect , useState } from "react"
import FilterProducts from "./pageComponents/FilterProducts"
import "./products.css"
import { toast , ToastContainer } from "react-toastify"
import ProductCard from "../../mainComponents/ProductCard/ProductCard"
import {  useLocation, useSearchParams } from "react-router-dom"

function Products() {
  const [productsList, setProductsList] = useState([])
  const categoryId = useSearchParams()[0].get("category")
  console.log(categoryId);
  
  useEffect(() => {
    const getProducts = async () => {
        const res = await fetch(`http://localhost:5000/api/v1/product${categoryId ? `?category=${categoryId}` : ""}`)
        if (!res.ok) return toast.error("something went wrong , please try again")
        const data = await res.json()
        setProductsList(data.products)
    }
    getProducts()
}, [categoryId])


  return (
    <div className="products-page-cont">
        <ToastContainer />
        <FilterProducts categoryId={categoryId} setProductsList={setProductsList} />
        <div className="products-list-cont">
            <div className="products-list">
                {productsList.length > 0 ? (
                    productsList.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))
                ) : <h2>no products</h2>}
            </div> 
        </div>
    </div>
  )
}

export default Products