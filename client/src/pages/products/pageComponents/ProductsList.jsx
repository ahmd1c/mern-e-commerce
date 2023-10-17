
import { useEffect, useState } from "react";
import "./productsList.css"
import ProductCard from "../../../mainComponents/ProductCard/ProductCard"

function ProductsList() {
    const [productsList, setProductsList] = useState([])

  
    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=10')
            .then(res => res.json())
            .then(data => {

                setProductsList(data);
                console.log(data);

            })
    }, [])
    return (
        <div className="products-list-cont">
            <h2>Electronics</h2>
            <div className="products-list">
                {productsList.length > 0 ? (
                    productsList.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                ) : <h2>no products</h2>}
            </div> 
        </div>
    )
}

export default ProductsList