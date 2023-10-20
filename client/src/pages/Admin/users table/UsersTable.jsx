
import "./usersTable.css"
import image from "../../../assets/modified.webp"

function UsersTable() {
    return (
        <div className="users-table-cont">
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input className="table-input" type="checkbox" name="" id="" />
                        </th>
                        <th>
                            user
                        </th>
                        <th>
                            No.orders
                        </th>
                        <th>
                            reviews
                        </th>
                        <th>
                            actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="table-input" type="checkbox" name="" id="" />
                        </td>
                        <td>
                            <div>
                                <div className="user-img">
                                    <img src={image} alt="" />
                                </div>
                                <div className="user-info">
                                    <h4>my name here</h4>
                                    <h5>email@email.academy</h5>
                                </div>
                            </div>
                        </td>
                        <td>
                            <b>32</b>
                            <button>view</button>
                        </td>
                        <td>
                            <b>54</b>
                            <button>view</button>
                        </td>
                        <td>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable