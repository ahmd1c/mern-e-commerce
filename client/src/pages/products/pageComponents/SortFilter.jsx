

// eslint-disable-next-line react/prop-types
function SortFilter({handleSortBy}) {
    return (
        <div className="sort-by">
            <h2>Sort By</h2>
            <div className="filter-sort-by-list">

                <div className="filter-sort-by">
                    <input name="sort" value="currentPrice asc" onChange={handleSortBy} type="radio" id="filter-sort-by-1" />
                    <label htmlFor="filter-sort-by-1">Price: Low to High</label>
                </div>

                <div className="filter-sort-by">
                    <input name="sort" value="currentPrice desc" onChange={handleSortBy} type="radio" id="filter-sort-by-2" />
                    <label htmlFor="filter-sort-by-2">Price: High to Low</label>
                </div>

                <div className="filter-sort-by">
                    <input name="sort" value="avgRate.avg asc" onChange={handleSortBy} type="radio" id="filter-sort-by-3" />
                    <label htmlFor="filter-sort-by-3">Rating: Low to High</label>
                </div>
                
                <div className="filter-sort-by">
                    <input name="sort" value="avgRate.avg desc" onChange={handleSortBy} type="radio" id="filter-sort-by-4" />
                    <label htmlFor="filter-sort-by-4">Rating: High to Low</label>
                </div>

                <div className="filter-sort-by">
                    <input name="sort" value="createdAt desc" onChange={handleSortBy} type="radio" id="filter-sort-by-5" />
                    <label htmlFor="filter-sort-by-5">Newest</label>
                </div>

                <div className="filter-sort-by">
                    <input name="sort" value="createdAt asc" onChange={handleSortBy} type="radio" id="filter-sort-by-6" />
                    <label htmlFor="filter-sort-by-6">Oldest</label>
                </div>

            </div>
        </div>
    )
}

export default SortFilter