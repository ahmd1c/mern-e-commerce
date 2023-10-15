
import './home.css'
import image from "../../assets/svg.svg"
import TopRatedProducts from './pageComponent/TopRatedProducts'
import { useEffect, useState } from 'react'
import MostSelledProducts from './pageComponent/MostSelled'

function Home() {
  const [topProducts, setTopProducts] = useState([])

  
    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products?limit=10')
    //         .then(res => res.json())
    //         .then(data => {

    //           setTopProducts(data);
    //             console.log(data);

    //         })
    // }, [])
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1> Experience Your Gateway to Quality Shopping 
          Enjoy our unbeatable offers </h1>
          <p> Your perfect product is just a click away.</p>
          <button className='btn-primary'>Shop now</button>
        </div>
        <div className="hero-img">
          <img src={image} alt='' />
        </div>
      </div>
      {topProducts.length>0 ?
      (
      <>
      <TopRatedProducts list={topProducts} />
      <br />
      <br />
      <br />
      <MostSelledProducts list={topProducts} />
      </>
      )
      :<h1>some thing went wrong</h1>
      }
    </>
  )
}

export default Home