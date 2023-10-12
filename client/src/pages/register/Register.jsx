import { Link } from "react-router-dom"


function Register() {
  return (
    <div className="auth-cont">
            <form >
            <div className="name">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="email">
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="password">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="repeat-password">
                    <label htmlFor="repeat-password">repeat password</label>
                    <input type="password" name="repeat-password" id="repeat-password" />
                </div>
                <div className="forget-register">
                    
                    <span>
                        Have an account ?
                        <Link to="/login">login now</Link>
                    </span>
                    <hr />
                    <button type="button">Login with google</button>
                    <hr />
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
  )
}

export default Register