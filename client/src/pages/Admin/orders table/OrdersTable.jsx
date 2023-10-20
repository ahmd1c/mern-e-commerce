import "./ordersTable.css";
import image from "../../../assets/modified.webp"

function OrdersTable() {
    return (
        <div className="orders-table-cont">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td>
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            <span className="material-symbols-outlined">
                                edit_note
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td>
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            <span className="material-symbols-outlined">
                                edit_note
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td>
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            <span className="material-symbols-outlined">
                                edit_note
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td>
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            <span className="material-symbols-outlined">
                                edit_note
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td>
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            <span className="material-symbols-outlined">
                                edit_note
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td>
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            <span className="material-symbols-outlined">
                                edit_note
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td>
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            <span className="material-symbols-outlined">
                                edit_note
                            </span>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
}

export default OrdersTable;
