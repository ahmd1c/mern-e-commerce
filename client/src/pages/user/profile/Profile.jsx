import { useRef } from "react";
import "./profile.css"
// import image from '../../../assets/default.png'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { setUser } from "../../../redux/userReducer";

function Profile() {

  const user = useSelector((state) => state.user);
  const formRef = useRef(null)
  const dispatch = useDispatch();
  console.log(user);
  const handleUpdate = async(e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const res = await fetch(`http://localhost:5000/api/v1/user/profile`, {
        method: "PUT",
        credentials: "include",
        body: formData
    })
    if(!res.ok) return toast.error("Something went wrong");
    const data = await res.json();
    console.log(data);
    if(data.success) {
      dispatch(setUser(data.user));
      toast.success("Profile updated successfully");
    }
  }

  return (
    <div className="profile-cont">
      <form ref={formRef} onSubmit={handleUpdate} >
        <div className="profile-img">
          <img src={user.profilePhoto} alt="profile" />
          <label htmlFor="upload">
            <span className="material-symbols-outlined">
              photo_camera
            </span>
            <input type="file" name="profilePhoto" id="upload" />
          </label>
        </div>
        <div className="name">
          <label htmlFor="name">Name</label>
          <input type="text" defaultValue={user.username} name="username" id="name" />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="text" value={user.email} disabled name="email" id="email" />
        </div>
        <div className="buttons">
          <button type="reset">Reset</button>
          <button type="submit">update</button>
        </div>
      </form>
      <form className="delete-account" action="">
        <h3>Delete Account</h3>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <p>note : all your orders history , whishlist will be removed</p>
        <p>note : your orders history will be saved in our database for statistics but you will not be able to access it</p>
        <button>Delete</button>
      </form>
    </div>
  )
}

export default Profile