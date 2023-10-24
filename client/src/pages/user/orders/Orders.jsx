import OrdersTable from "../../Admin/orders table/OrdersTable"
import "./orders.css"

function Orders() {
  return (
    <div className="orders-cont" >
      <OrdersTable profile={true} />
    </div>
  )
}

export default Orders