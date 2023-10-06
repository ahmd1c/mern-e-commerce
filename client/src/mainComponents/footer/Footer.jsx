
import "./footer.css"

function Footer() {

    const year = new Date().getFullYear()

  return (
    <footer>
        <div className="copy-rights">
            &copy; Ein-C {year} 
        </div>
        <div className="attribution">
        <a href="https://www.freepik.com/free-vector/application-smartphone-mobile-computer-payments-online-transaction-shopping-online-process-smartphone-vecter-cartoon-illustration-isometric-design_26111559.htm#query=online%20store&position=13&from_view=keyword&track=ais">Image by jcomp on Freepik</a> 

        </div>
    </footer>
  )
}

export default Footer