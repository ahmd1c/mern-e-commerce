import "./productsTable.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../../mainComponents/modal/Modal";
import AddProduct from "../Add product/AddProduct";

function ProductsTable() {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:5000/api/v1/product");
      if (!res.ok) return toast.error("something went wrong , please try again");
      const data = await res.json();
      console.log(data);
      setProducts(data.products);
    };
    getProducts();
  }, []);

  const handleDelete = async (productId) => {
    const res = await fetch(`http://localhost:5000/api/v1/product/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) return toast.error("something went wrong , please try again");
    toast.success("product deleted successfully");
    setProducts(products.filter((product) => product._id !== productId));
  };


  return (
    <div className="products-table-cont">
      <ToastContainer />
      {
        updateModal ? (
          <Modal setShowModal={setUpdateModal}>
            <AddProduct updateProduct={activeProduct} />
          </Modal>
        ) : null
      }
      {
        deleteModal ? (
          <Modal setShowModal={setDeleteModal}>
            <form className="delete-form">
              <p>Are you sure you want to delete {activeProduct.name} ?</p>
              <div className="btn-cont" >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(activeProduct._id);
                    setDeleteModal(false);
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </form>
          </Modal>

        ) : null
      }
      <h1>products</h1>
      <table>
        <thead>
          <tr>
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
          {products.length === 0 ? <tr><td>no products</td></tr> : products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="table-img">
                  <img
                    src={product.image}
                    alt="product"
                  />
                </div>

              </td>
              <td>{product.name}</td>
              <td>{product.category.name}</td>
              <td>{product.quantity}</td>
              <td>{product.currentPrice}</td>
              <td>{product.amountSold}</td>
              <td>
                <div>
                  <span
                    onClick={() => {
                      setDeleteModal(false);
                      setUpdateModal(true);
                      setActiveProduct(product);
                    }}
                    title="edit"
                    className="material-symbols-outlined"
                  >
                    edit_note
                  </span>
                  <span
                    title="delete"
                    onClick={() => {
                      setUpdateModal(false);
                      setDeleteModal(true);
                      setActiveProduct(product);
                    }}
                    className="material-symbols-outlined"
                  >
                    delete
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
