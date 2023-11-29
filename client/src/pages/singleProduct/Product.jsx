import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./product.css"
import { useDispatch } from "react-redux"
import { addCartItem } from "../../redux/cartReducer"
import { ToastContainer, toast } from "react-toastify"

function Product() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const handleAddToCart = () => {
        const { id , title , price , image } = product;
        const item = { id , title , price , image , quantity : 1 };
        dispatch(addCartItem(item));
        toast.success("Item added to cart" , {
            autoClose: 3000,
        });
    }


    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/product/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setProduct(result.product)
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
            <ToastContainer />
            <div className="main-product">
                <div className="product-left-side">
                    <div className="main-img">

                        <img src={product.image} alt={product.name} />
                    </div>
                </div>

                <div className="product-right-side">
                    <div className="product-title-whishlist">
                        <h1>{product.name}</h1>
                        
                        <span title="Add to whishlist" className="material-symbols-outlined">
                            favorite
                        </span>

                    </div>
                    <div className="product-info">
                        <h3>{product.currentPrice} $</h3>
                        <h4 className="product-rate">
                        {product.avgRate.avg}
                            <span className="material-symbols-outlined rate-icon">star</span>

                        </h4>
                    </div>
                    <p>{product.description}</p>
                    <div className="add-to-cart">
                        
                        <button onClick={handleAddToCart} className="btn-primary">Add to cart</button>

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