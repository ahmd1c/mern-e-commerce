import { useRef } from "react"
import "./changePassword.css"
import { ToastContainer, toast } from "react-toastify"

function ChangePassword() {

  const formPasswordRef = useRef(null)

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(formPasswordRef.current);
    const newPass = formData.get('newPassword');
    const repeatNewPass = formData.get('repeatNewPassword');
    const oldPass = formData.get('currentPassword');
    console.log(newPass, repeatNewPass);

    if (newPass.trim().length < 8) return toast.warn('Minimum password length is 8');
    if (newPass !== repeatNewPass) return toast.warn('Passwords do not match');

    const res = await fetch("http://localhost:5000/api/v1/user/changePassword", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentPassword: oldPass,
          newPassword: newPass,
          repeatNewPassword: repeatNewPass
        })
      });

    if (!res.ok) return toast.error("Something went wrong");
    const data = await res.json();
    if (data.success) toast.success("Password changed successfully");
    formPasswordRef.current.reset();
    
  }
  return (
    <div className="change-pass-cont">
      <ToastContainer />
      <form ref={formPasswordRef} onSubmit={handleChangePassword}>
        <div className="new-pass">
          <label htmlFor="newPass">New password</label>
          <input type="password" name="newPassword" id="newPass" />
        </div>
        <div className="repeat-new-pass">
          <label htmlFor="repeatNewPass">Repeat new password</label>
          <input type="password" name="repeatNewPassword" id="repeatNewPass" />
        </div>
        <div className="current-pass">
          <label htmlFor="currentPass">Current Password</label>
          <input type="password" name="currentPassword" id="currentPass" />
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