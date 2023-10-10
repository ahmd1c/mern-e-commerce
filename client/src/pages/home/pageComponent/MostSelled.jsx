/* eslint-disable react/prop-types */
import ProductCard from "../../../mainComponents/ProductCard/ProductCard"
import { EmblaCarousel } from "../../../mainComponents/swipper/CarouselComponent"


function MostSelledProducts({list}) {

   

    const MostSelledProductsList = (list)=>{
        return list.map((item)=>{
            return(
                <ProductCard key={item.id} product={item} />
            )
        })
    }

    return (
        <div className="top-rated-cont">
            <h2>Most Selled Products</h2>
            
                <EmblaCarousel list={MostSelledProductsList(list)} />
           
            
        </div>
    )
}

export default MostSelledProducts