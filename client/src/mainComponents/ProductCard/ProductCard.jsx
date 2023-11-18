/* eslint-disable react/prop-types */
import "./productCard.css";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/cartReducer";

function ProductCard({ product }) {

    
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const { id , title , price , image } = product;
        const item = { id , title , price , image , quantity : 1 };
        dispatch(addCartItem(item));
    }

    
    return (
        <div className="product-card">
            <a href={`/product/${product.id}`} className="product-card-img">
                <img  loading="lazy" src={product.image} alt="product" />
            </a>

            <h3 title={product.title} className="text-overflow">
                <a href={`/product/${product.id}`}>
                    {product.title}
                </a>
            </h3>

            <div className="product-card-info">
                <h4 className="product-card-rating">
                    <span className="material-symbols-outlined">star</span>
                    {product.rating.rate}
                </h4>
                <h3>{product.price} $</h3>
            </div>
            <p className="text-overflow">{product.description}</p>
            <button onClick={handleAddToCart} className="btn-primary">Add to cart</button>
        </div>
    );
}

export default ProductCard;
