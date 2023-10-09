import FilterProducts from "./pageComponents/FilterProducts"
import ProductsList from "./pageComponents/ProductsList"
import "./products.css"

function Products() {
  return (
    <div className="products-page-cont">
        <FilterProducts />
        <ProductsList />
    </div>
  )
}

export default Products