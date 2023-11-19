
import { useCallback, useEffect, useState } from "react"
import "./categoriesList.css"
import Modal from "../../../mainComponents/modal/Modal"
import { toast , ToastContainer } from "react-toastify"

function CategoriesList() {

    const [categories , setCategories] = useState([])
    const [activeCategory , setActiveCategory] = useState(0)
    const [subcategories, setSubCategories] = useState([])
    const [addCategory, setAddCategory] = useState("")
    const [addSubCategory, setAddSubCategory] = useState("")
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [showSubCategoryModal, setShowSubCategoryModal] = useState(false)

    const getSubCategories =useCallback( async(categoryId) => {

        const paramId = categoryId || categories[activeCategory]?._id

        const res = await fetch(`http://localhost:5000/api/v1/category/${paramId}` ,{
            method : "GET",
            credentials : "include",
        })
        if(!res.ok) return toast.error("something went wrong , please try again");
        const data = await res.json();
        if(!data.subCategories) return setSubCategories([]);
        setSubCategories(data.subCategories);
    }
    , [activeCategory])

    useEffect(() => {
        const getCategories = async() => {

            const res = await fetch("http://localhost:5000/api/v1/category" ,{
                method : "GET",
                credentials : "include",
            })
            if(!res.ok) return toast.error("something went wrong , please try again");
            const data = await res.json();
            setCategories(()=> data.categories);
            if(data.categories.length > 0){
                getSubCategories(data.categories[0]?._id );
            }
        }
        getCategories();
    }, [])

    useEffect(() => {
        if(categories.length === 0) return;
        getSubCategories();
    }, [activeCategory])

    const addNewCategory = async(e) => {
        e.preventDefault();
        if(addCategory.trim() === "") return toast.error("please fill the required fields");
        if(categories.some((category) => category.name.toLowerCase() === addCategory.toLowerCase())) return toast.error("category already exists");
        
        const res = await fetch("http://localhost:5000/api/v1/category" ,{
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name : addCategory
            })})

        if(!res.ok) return toast.error("something went wrong , please try again");

        const data = await res.json();
        setCategories([...categories , data]);
            toast.success("created successfully")
            setAddCategory("")
            setShowCategoryModal(false)
    }

    const handleDelete = async(id , variant) => {

        const res = await fetch(`http://localhost:5000/api/v1/category/${id}` ,{
            method : "DELETE",
            credentials : "include",
        })

        if(!res.ok) return toast.error("something went wrong , please try again");

        await res.json();
        // add variant of the function to handle delete subcategory and update subcategories when a category is deleted
        if(variant === "category"){
            setCategories(categories.filter((category) => category._id !== id));
            setActiveCategory(0)
        }else{
            setSubCategories(subcategories.filter((subcategory) => subcategory._id !== id));
        }
            toast.success("deleted successfully")

    }


    const addNewSubCategory = async(e) => {
        e.preventDefault();
        if(subcategories.some((subcategory) => subcategory.name.toLowerCase() === addSubCategory.toLowerCase())) return toast.error("subcategory already exists");
        
        const res = await fetch("http://localhost:5000/api/v1/category" ,{
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name : addSubCategory,
                parentCategory : categories[activeCategory]._id
            })})

        if(!res.ok) return toast.error("something went wrong , please try again");

        const data = await res.json();
        setSubCategories([...subcategories , data]);
            toast.success("created successfully")
            setAddCategory("")
            setShowSubCategoryModal(false)
    }



    return (
        <div className="categories-list-cont">
            <ToastContainer/>
            <div className="title-add-new">
                <h2>Categories</h2>
                <button onClick={() => setShowCategoryModal(true)} className="btn-primary">Add new</button>
            </div>
            <div className="categories-wrapper">

                {categories.length > 0 ?
                    categories.map((category , ind) => {

                        return (
                            <div key={category._id} onClick={() => setActiveCategory(ind)} className={activeCategory === ind ? "single-category active" : "single-category"}>
                                <h3>{category.name}</h3>
                                <span onClick={() => handleDelete(category._id , "category")} className="material-symbols-outlined">
                                    delete
                                </span>
                            </div>
                        )
                    })
                    : <h2> no categories</h2>
                }

            </div>
            <div className="title-add-new">
                <h2>Sub Categories</h2>
                <button onClick={() => setShowSubCategoryModal(true)} className="btn-primary">Add new</button>
            </div>
            <div className="subcategories-wrapper">
                {subcategories.length > 0 ?
                    subcategories.map((subCategory, ind) => {

                        return (
                            <div key={ind} className="single-sub-category">
                                <h3>{subCategory.name}</h3>
                                <span onClick={() => handleDelete(subCategory._id , "subcategory")} className="material-symbols-outlined">
                                    delete
                                </span>
                            </div>
                        )
                    })
                    : <h2> no sub categories</h2>
                }
            </div>
            { showCategoryModal && 
            <Modal setShowModal={setShowCategoryModal} handleSubmit={addNewCategory} >
                <label htmlFor="new-category">
                    new category
                </label>
                <input onChange={(e) => setAddCategory(e.target.value)} type="text" id="new-category" />
            </Modal>
            }

            {
                showSubCategoryModal && 
                <Modal setShowModal={setShowSubCategoryModal} handleSubmit={addNewSubCategory} >
                    
                    <label htmlFor="new-subcategory">
                        new sub category
                    </label>
                    <input onChange={(e) => setAddSubCategory(e.target.value)} type="text" id="new-subcategory" />
                </Modal>

            }

        </div>
    )
}

export default CategoriesList