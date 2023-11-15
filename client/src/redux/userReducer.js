import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  profilePhoto : "",
  _id : "",
  role : "",
  email :"" ,
}


export const userSlice = createSlice({
  name : 'user',
  initialState,
  reducers : {
    setUser : (state , {payload})=>{
      for(let key in state){
        state[key] = payload[key]
      }
      localStorage.setItem('user', JSON.stringify(state))
    },
    getUser : (state)=>{
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        for(let key in state){
            state[key] = user[key]
          }
      } 
    },
    logUserOut : (state)=>{
      localStorage.removeItem("user")
      state.username = "";
      state.profilePhoto = "";
      state._id = "";
      state.role = "";
      state.email = "";
    }
  }
})

export const {setUser , getUser , logUserOut} = userSlice.actions
export default userSlice.reducer

