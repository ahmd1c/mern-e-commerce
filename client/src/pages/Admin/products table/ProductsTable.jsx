
import "./productsTable.css";
import image from "../../../assets/modified.webp"

function ProductsTable() {
  return (
    <div className="products-table-cont">
      <table>
        <thead>
          <tr>
            <th><input className="table-input" type="checkbox" name="" id="" /></th>
            <th>img</th>
            <th>name</th>
            <th>category</th>
            <th>stock amount</th>
            <th>price</th>
            <th>amount sold</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          
          <tr>
            <td><input className="table-input" type="checkbox" name="" id="" /></td>
            <td>
              <div className="table-img">
                <img src={image} alt="product" />
              </div>
            </td>
            <td><h5>mobile tablet hi hi hi eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h5></td>
            <td>electronics</td>
            <td>232</td>
            <td>232$</td>
            <td>231</td>
            <td>
              <div>
                <span className="material-symbols-outlined">
                  edit_note
                </span>
                <span className="material-symbols-outlined">
                  delete
                </span>
              </div>
            </td>
          </tr>
         
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable