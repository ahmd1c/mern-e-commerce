import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./product.css"

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setProduct(result)
                    setLoading(false)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setError(error)
                    setLoading(false)
                }
            )
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="product-page-cont">
            <div className="main-product">
                <div className="product-left-side">
                    <div className="main-img">

                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="mini-imgs">
                        <div className="mini-img">
                        <img src={product.image} alt={product.name} />
                        </div>
                        <div className="mini-img">
                        <img src={product.image} alt={product.name} />
                        </div>
                        <div className="mini-img">
                        <img src={product.image} alt={product.name} />
                        </div>
                        <div className="mini-img">
                        <img src={product.image} alt={product.name} />
                        </div>
                    </div>
                </div>

                <div className="product-right-side">
                    <div className="product-title-whishlist">
                        <h1>{product.title}</h1>
                        
                        <span title="Add to whishlist" className="material-symbols-outlined">
                            favorite
                        </span>

                    </div>
                    <div className="product-info">
                        <h3>{product.price} $</h3>
                        <h4 className="product-rate">
                            {product.rating.rate}
                            <span className="material-symbols-outlined rate-icon">star</span>

                        </h4>
                    </div>
                    <p>{product.description}</p>
                    <div className="add-to-cart">
                        <div className="item-cart-amount">
                            <span>Quantity:</span>
                            <button>+</button>

                            <input type="number"  min="1" max="10" />

                            <button>-</button>
                        </div>
                        <button className="btn-primary">Add to cart</button>

                    </div>
                </div>
            </div>
            <div className="related-products">
                <h2>Related Products</h2>
                <div className="related-product-cards">
                    {/* product card of related products */}
                </div>
            </div>

        </div>

    )
}

export default Product