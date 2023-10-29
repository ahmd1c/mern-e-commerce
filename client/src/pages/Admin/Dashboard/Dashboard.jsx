import { useCallback, useState } from "react"
import AddProduct from "../Add product/AddProduct"
import "./dashboard.css"
import ProductsTable from "../products table/ProductsTable"
import OrdersTable from "../orders table/OrdersTable"
import UsersTable from "../users table/UsersTable"
import CategoriesList from "../categories/CategoriesList"


function Dashboard() {
    const [statistics , setStatistics] = useState(true)
    const [products , setProducts] = useState(false)
    const [addProduct , setAddProduct] = useState(false)
    const [orders , setOrders] = useState(false)
    const [users , setUsers] = useState(false)
    const [categories , setCategories] = useState(false)

    const handleLayout = useCallback((active)=>{
        const layOutArr = [setStatistics , setProducts , setAddProduct , setOrders , setUsers  ,  setCategories ]
        layOutArr.forEach((fn=> fn(false)))
        layOutArr[active](true)
    },[])

    return (
        <div className="admin-cont">
            
            <div className="admin-aside">
                <div onClick={()=> handleLayout(0)} className="statistics">
                    <span className="material-symbols-outlined">
                        monitoring
                    </span>
                    <h5>Statistics</h5>
                </div>
                <div onClick={()=> handleLayout(1)} className="products">
                    <span className="material-symbols-outlined">
                        shopping_basket
                    </span>
                    <h5>Products</h5>
                </div>
                <div onClick={()=> handleLayout(2)} className="add-product">
                    <span className="material-symbols-outlined">
                        add_shopping_cart
                    </span>
                    <h5>Add Product</h5>
                </div>
                <div onClick={()=> handleLayout(3)} className="Orders">
                    <span className="material-symbols-outlined">
                        payments
                    </span>
                    <h5>Orders</h5>
                </div>
                <div onClick={()=> handleLayout(4)} className="users">
                    <span className="material-symbols-outlined">
                        group
                    </span>
                    <h5>Users</h5>
                </div>
                <div onClick={()=> handleLayout(5)} className="Categories">
                    <span className="material-symbols-outlined">
                        category
                    </span>
                    <h5>Categories</h5>
                </div>
            </div>
            <div className="admin-main">
                {products ? <ProductsTable /> : null}
                {addProduct ? <AddProduct /> : null}
                {orders ? <OrdersTable /> : null}
                {users ? <UsersTable /> : null}
                {categories ? <CategoriesList /> : null}
            </div>
        </div>
    )
}

export default Dashboard