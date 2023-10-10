/* eslint-disable react/prop-types */
import "./topRatedProducts.css"
import ProductCard from "../../../mainComponents/ProductCard/ProductCard"
import { EmblaCarousel } from "../../../mainComponents/swipper/CarouselComponent"


function TopRatedProducts({list}) {

   

    const TopRatedProductsList = (list)=>{
        return list.map((item)=>{
            return(
                <ProductCard key={item.id} product={item} />
            )
        })
    }

    return (
        <div className="top-rated-cont">
            <h2>Top Rated Products</h2>
            
                <EmblaCarousel list={TopRatedProductsList(list)} />
           
            
        </div>
    )
}

export default TopRatedProducts