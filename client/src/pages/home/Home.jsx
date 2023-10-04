
import './home.css'
import image from "../../assets/svg.svg"

function Home() {
  return (
    <main>
      <div className="hero">
        <div className="hero-text">
          <h1> Experience Your Gateway to Quality Shopping 
          Enjoy our unbeatable offers </h1>
          <p> Your perfect product is just a click away.</p>
          <button>Shop now</button>
        </div>
        <div className="hero-img">
          <img src={image} alt='' />
        </div>
      </div>
    </main>
  )
}

export default Home