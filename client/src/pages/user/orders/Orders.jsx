import { useEffect, useState } from "react"
import OrdersTable from "../../Admin/orders table/OrdersTable"
import "./orders.css"
import { ToastContainer, toast } from "react-toastify"

function Orders() {

  const [ ordersList , setOrdersList ] = useState([])

  useEffect(() => {
    const getUSerOrder = async () => {
      const res = await fetch("http://localhost:5000/api/v1/user/orders", { credentials: "include" })
      if (!res.ok) return toast.error("something went wrong , please try again")
      const data = await res.json();
      console.log(data);
      setOrdersList(data.orders)
    }
    getUSerOrder()
  }, [])

  return (
    <div className="orders-cont" >
      <ToastContainer />
      <OrdersTable  profile={true}  ordersList={ordersList} />
    </div>
  )
}

export default Orders