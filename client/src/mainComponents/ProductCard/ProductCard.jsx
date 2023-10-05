/* eslint-disable react/prop-types */
import "./productCard.css";

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="product-card-img">
                <img src={product.image} alt="" />
            </div>

            <h3 title={product.title} className="text-overflow">
                {product.title}
            </h3>

            <div className="product-card-info">
                <h4 className="product-card-rating">
                    <span className="material-symbols-outlined">star</span>
                    {product.rating.rate}
                </h4>
                <h3>{product.price} $</h3>
            </div>
            <p className="text-overflow">{product.description}</p>
            <button className="btn-primary">Add to cart</button>
        </div>
    );
}

export default ProductCard;
