import { useEffect, useState } from "react"
import { toast } from "react-toastify"


// eslint-disable-next-line react/prop-types
function CategoryFilter({handleCategory , categoryId}) {
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const getSubCategories = async () => {
            if(!categoryId) return toast.warning("please select the main category first")
            
            const res = await fetch(`http://localhost:5000/api/v1/category/${categoryId}`)
            if(!res.ok) return toast.error("something went wrong , please try again")
            const data = await res.json()
            setSubCategories(data.subCategories)
        }
        getSubCategories()
    }, [categoryId])

    return (
        <div className="category">
            <h2>Sub Categories</h2>
            <div className="filter-category-list">

                {subCategories.map((subCategory) => (
                    <div key={subCategory._id} className="filter-category-item">
                        <input
                            type="radio"
                            id={subCategory.name}
                            name="subCategory"
                            value={subCategory._id}
                            onChange={handleCategory}
                        />
                        <label htmlFor={subCategory.name}>{subCategory.name}</label>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CategoryFilter