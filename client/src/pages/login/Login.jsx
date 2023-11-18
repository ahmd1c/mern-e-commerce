
import { Link } from "react-router-dom"
import {useNavigate} from "react-router-dom" 
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"
import { useState } from "react";

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    
    const handleLoginInSubmit = async(e)=>{
      e.preventDefault();
      toast("please wait...")
      if(email.trim() === "" || password.trim()==="" ) return toast.error("please fill the required fields")
      try{
  
        const response = await fetch("http://localhost:5000/api/v1/user/signin" , {
          method: "POST",
          credentials:"include",
          headers: {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            email ,
            password
          })
        })
        
        const data = await response.json()
        
        if(data.success === true){ 
          dispatch(setUser(data.user));
          toast.success("You are Successfully loged in")
          navigate('/' , {replace : true})
        }else if(data.success === false){ 
          toast.error("invalid email or password")
        }
      }catch(error){
          toast.error("Something went wrong , Please try again")
      }
    }
    

    return (
        <div className="auth-cont">
            <ToastContainer />
            <form onSubmit={handleLoginInSubmit} >
                <div className="email">
                    <label htmlFor="email">email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" />
                </div>
                <div className="password">
                    <label htmlFor="password">password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" />
                </div>
                <div className="forget-register">
                    <Link to="#">forgot your password?</Link>
                    <span>
                        Do not have one ?
                        <Link to="/register">create an account now</Link>
                    </span>
                    <hr />
                    <button type="button">Login with google</button>
                    <hr />
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login