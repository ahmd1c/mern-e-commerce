import { useEffect, useRef, useState } from "react"
import "./AddProduct.css"
import {toast , ToastContainer} from "react-toastify"
import validate from "../../../utils/ValidateProduct"

function AddProduct() {

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [subCategories, setSubCategories] = useState([])
    const [filteredSubCategories, setFilteredSubCategories] = useState([])
    const [image, setImage] = useState("")
    const formRef = useRef(null)
    

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch("http://localhost:5000/api/v1/category");
            return res.json();
        }
        const getSubCategories = async () => {
            const res = await fetch("http://localhost:5000/api/v1/category/subcategories");
            return res.json();
        }
        Promise.all([getCategories(), getSubCategories()])
            .then(([categoriesData, subCategoriesData]) => {
                setCategories(categoriesData.categories);
                setSelectedCategory(categoriesData.categories[0]._id);
                setSubCategories(subCategoriesData.subCategories);
                console.log(categoriesData, subCategoriesData);
            })

    }, [])

    useEffect(() => {
        setFilteredSubCategories(subCategories.filter(subCategory => subCategory.parentCategory._id === selectedCategory))
        console.log(selectedCategory);
    },[selectedCategory])

    const handleCreateProduct = async(e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        
        const result = validate(formData);

        console.log(result);
        if (!result[0]) {
            return toast.error(result[1]);
        }

        const options = {
            method: "POST",
            credentials: "include",
            body: formData,
        }
        const request = new Request("http://localhost:5000/api/v1/product", options);
        const res = await fetch(request);
        if (!res.ok) {
            return toast.error("something went wrong , please try again");
        }
        const data = await res.json();
        if(data){
            toast.success("product created successfully");
            formRef.current.reset();
            URL.revokeObjectURL(image);
            setImage("");
            setSelectedCategory(categories[0]._id);
        }
    }

    return (
        <div className="add-product-cont">
            <ToastContainer />
            <h2>Add product</h2>
            <form onSubmit={handleCreateProduct} ref={formRef} >
                <div className="inputs">
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div style={{ "--n": "2" }} className="form-group">
                        <div className="category">
                            <label htmlFor="category">Category</label>
                            <select onChange={e => setSelectedCategory(e.target.value)} name="category" id="category">
                                {categories.map(category =>
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="subCategory">
                            <label htmlFor="subCategory">Sub Category</label>
                            <select  name="subCategory" id="subCategory">
                                {filteredSubCategories.map(subCategory =>
                                    <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="quantity">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" name="quantity" id="quantity" />
                        </div>
                        <div className="main-price">
                            <label htmlFor="previous">previous Price</label>
                            <input type="number" name="previousPrice" id="previous" />
                        </div>
                        <div className="sale-price">
                            <label htmlFor="current">current Price</label>
                            <input type="number" name="currentPrice" id="current" />
                        </div>
                    </div>
                    <div className="description">
                        <label htmlFor="description">Description</label>
                        <textarea style={{ backgroundColor: "white" }} name="description" id="description" cols="30" rows="6"></textarea>
                    </div>
                </div>
                <div className="images">
                    <div className="main-img">
                        <img src={image} alt="product" />
                    </div>
                    <button className="btn-primary" type="button"> <input onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} type="file" name="image" id="image" />Upload Image</button>
                </div>
                <button className="btn-primary">Add product</button>
            </form>
        </div>
    )
}

export default AddProduct