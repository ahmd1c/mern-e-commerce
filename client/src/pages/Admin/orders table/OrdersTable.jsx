/* eslint-disable react/prop-types */
import "./ordersTable.css";
import image from "../../../assets/modified.webp";
import { useEffect, useState } from "react";
import Modal from "../../../mainComponents/modal/Modal";
import ItemsContent from "../../../mainComponents/itemsModalContent/itemsContent";
import { ToastContainer, toast } from "react-toastify";

function OrdersTable({ profile, ordersList }) {
    // console.log(ordersList);

    const [orders, setOrders] = useState([]);
    const [itemsModal, setItemsModal] = useState(false);
    const [activeOrder, setActiveOrder] = useState({});
    const [inputMode, setInputMode] = useState(false);
    const [newStatus, setNewStatus] = useState("");

    const handleUpdateStatus = (id, status) => {
        const updateStatus = async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/order/${id}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );

            if (!res.ok)
                return toast.error("something went wrong , please try again");

            const newOrders = orders.map((order) => {
                if (order._id === id) {
                    order.status = status;
                }
                return order;
            });
            setOrders(newOrders);
            setInputMode(false);
            toast.success("status updated");
        };
        updateStatus();
    };

    useEffect(() => {
        if (ordersList) {
            setOrders(ordersList);
        } else if (orders == false) {
            const getAllOrders = async () => {
                const res = await fetch("http://localhost:5000/api/v1/order/admin", { credentials: "include" });
                if (!res.ok) return toast.error("something went wrong , please try again");
                const data = await res.json();
                console.log(data);
                setOrders(data.orders);
            };
            getAllOrders();
        }
    }, [ordersList, orders]);

    return (
        <div className="orders-table-cont">
            <ToastContainer />
            <h2>Orders</h2>
            {itemsModal ? (
                <Modal setShowModal={setItemsModal}>
                    <ItemsContent
                        orderStatus={activeOrder.status}
                        profile={profile}
                        items={activeOrder.products}
                    />
                </Modal>
            ) : null}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        {!profile ? <th>Customer</th> : null}
                        <th>Items</th>
                        <th>address</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.createdAt.split("T")[0]}</td>
                                {!profile ? (
                                    <td>
                                        <div>
                                            <div className="image">
                                                <img src={image} alt="profile" />
                                            </div>
                                            <h5>name WEE how</h5>
                                        </div>
                                    </td>
                                ) : null}
                                <td>
                                    <button
                                        onClick={() => {
                                            setActiveOrder(order);
                                            setItemsModal(true);
                                        }}
                                    >
                                        view
                                    </button>
                                </td>
                                <td>{order.address}</td>
                                <td>{order.totalPrice} $</td>
                                <td style={{ maxWidth: "initial" }}>
                                    {inputMode ? (
                                        <>
                                            <select
                                                style={{
                                                    backgroundColor: "#013b2e",
                                                    padding: "2px",
                                                    fontSize: "13px",
                                                    letterSpacing: "1.2px",
                                                }}
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                            >
                                                <option value="processing">processing</option>
                                                <option value="shipped">shipped</option>
                                                <option value="delivered">delivered</option>
                                                <option value="cancelled">cancelled</option>
                                            </select>
                                            <button
                                                style={{ backgroundColor: "green" }}
                                                onClick={() => handleUpdateStatus(order._id , newStatus)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                style={{ backgroundColor: "#b92121" }}
                                                onClick={() => setInputMode(!inputMode)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <span className="status">{order.status}</span>
                                    )}
                                    {!profile ? (
                                        <span
                                            className="material-symbols-outlined"
                                            onClick={() => setInputMode(!inputMode)}
                                        >
                                            edit_note
                                        </span>
                                    ) : null}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>no orders</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersTable;
