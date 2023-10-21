import "./profile.css"
import image from '../../../assets/default.png'

function Profile() {
  return (
    <div className="profile-cont">
      <form action="">
        <div className="profile-img">
          <img src={image} alt="" />
          <label htmlFor="upload">
            <span className="material-symbols-outlined">
              photo_camera
            </span>
            <input type="file" name="upload" id="upload" />
          </label>
        </div>
        <div className="name">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
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