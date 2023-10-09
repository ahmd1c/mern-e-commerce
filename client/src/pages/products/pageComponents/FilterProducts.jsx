
import { useState } from "react"
import "./filterProducts.css"

function FilterProducts() {
  const [showFilter , setShowFilter]= useState(false)

  return (
    <>
    <span style={{position : "fixed" , display : showFilter ? "none" : "initial"}} onClick={()=> setShowFilter(true)} className="material-symbols-outlined">
        tune
      </span>
    <div className={`filter-cont ${showFilter ? "active" : ""}`}>
      <span onClick={()=> setShowFilter(false)} className={`material-symbols-outlined ${showFilter ? "active" : ""}`}>
        close
      </span>
      <div className="category">
        <h2>Categories</h2>
        <div className="filter-category-list">
          <div className="filter-category">
            <input type="checkbox" id="filter-category-1" />
            <label htmlFor="filter-category-1">All</label>
          </div>
          <div className="filter-category">
            <input type="checkbox" id="filter-category-2" />
            <label htmlFor="filter-category-2">Electronics</label>
          </div>
          <div className="filter-category">
            <input type="checkbox" id="filter-category-3" />
            <label htmlFor="filter-category-3">Clothing</label>
          </div>
          <div className="filter-category">
            <input type="checkbox" id="filter-category-4" />
            <label htmlFor="filter-category-4">Food</label>
          </div>
          <div className="filter-category">
            <input type="checkbox" id="filter-category-5" />
            <label htmlFor="filter-category-5">Health</label>
          </div>
        </div>
      </div>
      <div className="price">
        <h2>Price</h2>
        <div className="filter-price-list">
          <label htmlFor="min-price">Min</label>
          <input type="number" min={0} max={10000} id="min-price" />
          <label htmlFor="max-price">Max</label>
          <input type="number" min={0} max={10000} id="max-price" />
        </div>
      </div>
      <div className="sort-by">
        <h2>Sort By</h2>
        <div className="filter-sort-by-list">
          <div className="filter-sort-by">
            <input type="checkbox" id="filter-sort-by-1" />
            <label htmlFor="filter-sort-by-1">Price: Low to High</label>
          </div>
          <div className="filter-sort-by">
            <input type="checkbox" id="filter-sort-by-2" />
            <label htmlFor="filter-sort-by-2">Price: High to Low</label>
          </div>
          <div className="filter-sort-by">
            <input type="checkbox" id="filter-sort-by-3" />
            <label htmlFor="filter-sort-by-3">Rating: Low to High</label>
          </div>
          <div className="filter-sort-by">
            <input type="checkbox" id="filter-sort-by-4" />
            <label htmlFor="filter-sort-by-4">Rating: High to Low</label>
          </div>
          <div className="filter-sort-by">
            <input type="checkbox" id="filter-sort-by-5" />
            <label htmlFor="filter-sort-by-5">Newest</label>
          </div>
          <div className="filter-sort-by">
            <input type="checkbox" id="filter-sort-by-6" />
            <label htmlFor="filter-sort-by-6">Oldest</label>
          </div>

        </div>
      </div>
      <div className="filter-buttons">
        <button>Reset</button>
        <button>Apply</button>
      </div>

    </div>
    </>
  )
}

export default FilterProducts