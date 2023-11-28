/* eslint-disable react/prop-types */
import "./productCard.css";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/cartReducer";
import { ToastContainer, toast } from "react-toastify";

function ProductCard({ product }) {

    
    const dispatch = useDispatch();

    const handleAddToCart = async() => {
        const { _id , name , currentPrice , image } = product;
        const item = { _id , name , currentPrice , image , quantity : 1 };
        const serverItem = {productId : _id , quantity : 1}
        
        const res = await fetch("http://localhost:5000/api/v1/cart", {
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(serverItem)
        })
        if(!res.ok) {
            return toast.error("Something went wrong");
        }
        const data = await res.json();
        if(!data.success) {
            return toast.error("something went wrong");
        }
        dispatch(addCartItem(item));
    }

    
    return (
        <div className="product-card">
            <ToastContainer />
            <a href={`/product/${product._id}`} className="product-card-img">
                <img  loading="lazy" src={product.image} alt="product" />
            </a>

            <h3 title={product.name} className="text-overflow">
                <a href={`/product/${product._id}`}>
                    {product.name}
                </a>
            </h3>

            <div className="product-card-info">
                <h4 className="product-card-rating">
                    <span className="material-symbols-outlined">star</span>
                    {product.avgRate.avg}
                </h4>
                <h3>{product.currentPrice} $</h3>
            </div>
            <p className="text-overflow">{product.description}</p>
            <button onClick={handleAddToCart} className="btn-primary">Add to cart</button>
        </div>
    );
}

export default ProductCard;
