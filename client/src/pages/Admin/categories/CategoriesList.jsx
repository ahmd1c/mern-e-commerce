
import { useState } from "react"
import "./categoriesList.css"

function CategoriesList() {
    const [categories] = useState(["electronics", "clothes", "health", "house"])
    const [subcategories, setSubCategories] = useState(["mobiles", "Labtops", "Desktops", "tablets"])
    return (
        <div className="categories-list-cont">
            <div className="title-add-new">
                <h2>Categories</h2>
                <button className="btn-primary">Add new</button>
            </div>
            <div className="categories-wrapper">

                {categories.length > 0 ?
                    categories.map((category, ind) => {

                        return (
                            <div key={ind} className="single-category">
                                <h3>{category}</h3>
                                <span className="material-symbols-outlined">
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
                <button className="btn-primary">Add new</button>
            </div>
            <div className="subcategories-wrapper">
                {subcategories.length > 0 ?
                    subcategories.map((subCategory, ind) => {

                        return (
                            <div key={ind} className="single-sub-category">
                                <h3>{subCategory}</h3>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </div>
                        )
                    })
                    : <h2> no sub categories</h2>
                }
            </div>
        </div>
        // we need modal here for adding new and assuring delete
    )
}

export default CategoriesList