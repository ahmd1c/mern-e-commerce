/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./AddProduct.css";
import { toast, ToastContainer } from "react-toastify";
import validate from "../../../utils/ValidateProduct";

function AddProduct({ updateProduct }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [image, setImage] = useState("");
    const [product, setProduct] = useState(updateProduct);
    const formRef = useRef(null);

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch("http://localhost:5000/api/v1/category");
            return res.json();
        };
        const getSubCategories = async () => {
            const res = await fetch("http://localhost:5000/api/v1/category/subcategories");
            return res.json();
        };
        Promise.all([getCategories(), getSubCategories()])
            .then(
                ([categoriesData, subCategoriesData]) => {
                    setCategories(categoriesData.categories);
                    setSubCategories(subCategoriesData.subCategories);
                    if (!product) return setSelectedCategory(categoriesData.categories[0]._id);
                    setSelectedCategory(product.category._id);
                }
            );
    }, [product]);

    useEffect(() => {
            setFilteredSubCategories(
                subCategories.filter(
                    (subCategory) => subCategory.parentCategory._id === selectedCategory
                )
            );
    }, [selectedCategory]);

    const handleProduct = async (e, productId) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const result = validate(formData);
        if (!result[0]) return toast.error(result[1]);

        const options = {
            method: product ? "PUT" : "POST",
            credentials: "include",
            body: formData,
        };

        const url = product ? `http://localhost:5000/api/v1/product/${productId}` : "http://localhost:5000/api/v1/product"
        const res = await fetch(url, options);
        if (!res.ok) return toast.error("something went wrong , please try again");

        const data = await res.json();
        if (data) {
            if (product) {
                setProduct(data.product);
                toast.success("product updated successfully");
            } else {
                toast.success("product created successfully");
                formRef.current.reset();
                setImage("");
                setSelectedCategory(categories[0]._id);
            }
            URL.revokeObjectURL(image);
        }
    };

    return (
        <div className="add-product-cont">
            <ToastContainer />
            <h2>{product ? "edit product" : "add product"}</h2>
            <form onSubmit={(e) => handleProduct(e, product?._id)} ref={formRef}>
                <div className="inputs">
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <input defaultValue={product && product?.name} type="text" name="name" id="name" />
                    </div>
                    <div style={{ "--n": "2" }} className="form-group">
                        <div className="category">
                            <label htmlFor="category">Category</label>
                            <select
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                name="category"
                                id="category"
                            >
                                {categories.map((category) => (
                                    <option
                                        selected={category._id === product?.category?._id}
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="subCategory">
                            <label htmlFor="subCategory">Sub Category</label>
                            <select name="subCategory" id="subCategory">
                                {filteredSubCategories.map((subCategory) => (
                                    <option
                                        selected={subCategory._id === product?.subCategory?._id}
                                        key={subCategory._id}
                                        value={subCategory._id}
                                    >
                                        {subCategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="quantity">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                defaultValue={product && product?.quantity}
                                type="number"
                                name="quantity"
                                id="quantity"
                            />
                        </div>
                        <div className="main-price">
                            <label htmlFor="previous">previous Price</label>
                            <input
                                defaultValue={product && product?.previousPrice}
                                type="number"
                                name="previousPrice"
                                id="previous"
                            />
                        </div>
                        <div className="sale-price">
                            <label htmlFor="current">current Price</label>
                            <input
                                defaultValue={product && product?.currentPrice}
                                type="number"
                                name="currentPrice"
                                id="current"
                            />
                        </div>
                    </div>
                    <div className="description">
                        <label htmlFor="description">Description</label>
                        <textarea
                            defaultValue={product && product?.description}
                            style={{ backgroundColor: "white" }}
                            name="description"
                            id="description"
                            cols="30"
                            rows="6"
                        ></textarea>
                    </div>
                </div>
                <div className="images">
                    <div className="main-img">
                        <img src={product ? product?.image : image} alt="product" />
                    </div>
                    <button className="btn-primary" type="button">
                        {" "}
                        <input
                            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                            type="file"
                            name="image"
                            id="image"
                        />
                        Upload Image
                    </button>
                </div>
                {product ? (
                    <button className="btn-primary" type="submit">
                        Update Product
                    </button>
                ) : (
                    <button className="btn-primary" type="submit">
                        Create Product
                    </button>
                )}
            </form>
        </div>
    );
}

export default AddProduct;
