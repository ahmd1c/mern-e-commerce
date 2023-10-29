import "./ordersTable.css";
import image from "../../../assets/modified.webp"

// eslint-disable-next-line react/prop-types
function OrdersTable({profile}) {
    return (
        <div className="orders-table-cont">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        {!profile ? <th>Customer</th> : null}
                        <th>Items</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                <tr>
                        <td>1</td>
                        <td>23/2/2023</td>
                        {!profile ? <td>
                            <div>
                                <div className="image">
                                    <img src={image} alt="profile" />
                                </div>
                                <h5>name WEE how</h5>
                            </div>
                        </td> : null}
                        <td>
                            <button>view</button>
                        </td>
                        <td>323$</td>
                        <td>
                            <span className="status">pending</span>
                            {!profile ? <span className="material-symbols-outlined">
                                edit_note
                            </span>: null}
                        </td>
                    </tr>
                   
                </tbody>

            </table>
        </div>
    );
}

export default OrdersTable;
