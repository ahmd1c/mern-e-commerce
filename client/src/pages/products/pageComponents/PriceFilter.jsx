

// eslint-disable-next-line react/prop-types
function PriceFilter({handlePrice}) {
    return (
        <div className="price">
            <h2>Price</h2>
            <div className="filter-price-list">

                <label htmlFor="min-price">Min</label>
                <input type="number" name="minPrice" onChange={handlePrice} min={0} max={10000} id="min-price" />

                <label htmlFor="max-price">Max</label>
                <input type="number" name="maxPrice" onChange={handlePrice} min={0} max={10000} id="max-price" />
                
            </div>
        </div>
    )
}

export default PriceFilter