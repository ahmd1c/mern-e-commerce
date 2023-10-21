import "./changePassword.css"

function ChangePassword() {
  return (
    <div className="change-pass-cont">
      <form action="">
        <div className="new-pass">
          <label htmlFor="newPass">New password</label>
          <input type="password" name="newPass" id="newPass" />
        </div>
        <div className="repeat-new-pass">
          <label htmlFor="repeatNewPass">Repeat new password</label>
          <input type="password" name="repeatNewPass" id="repeatNewPass" />
        </div>
        <div className="current-pass">
          <label htmlFor="currentPass">Current Password</label>
          <input type="password" name="currentPass" id="currentPass" />
        </div>
        <div className="buttons">
          <button type="reset">Reset</button>
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword