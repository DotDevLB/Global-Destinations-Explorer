import React, { useEffect, useRef } from "react";
import "./Login.css";
import axios, { Axios } from "axios";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CancelIcon from "@mui/icons-material/Cancel";
//import{toast}from "react-toastify"
//import'react-toastify/dist/ReactToastify.css'

//ASSEMON LAYER HONE KNOW KELL SHI HANDELING LALBUISNESS LAYER
//KELL SHI API BHOTA BEL BUISNESS LAYER SINCE AAM BAAMOL FUNCTION HANDLE MENNA W BAADEN BAYETLA


// hayda.js

// import axios from "axios";

// const loginUser = async (username, password) => {
//   try {
//     const resp = await axios.post("/users/login", { username, password });
//     return resp.data; // Return the response data
//   } catch (error) {
//     throw new Error(error.response.data.message || "Login failed");
//   }
// };

// export { loginUser };


//.jsx
// import React, { useRef } from "react";
// import { loginUser } from "./AuthService"; // Import the AuthService

// const Login = ({ setShowLogin, setCurrentUser }) => {
//   const nameRef = useRef();
//   const passRef = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const username = nameRef.current.value;
//       const password = passRef.current.value;

//       const response = await loginUser(username, password); // Use the loginUser function from AuthService

//       // Handle response here (success or error)
//       if (response.errorCode === 200) {
//         const { /* Destructure user data */ } = response.user;
//         setCurrentUser(response.user);
//         // Handle success actions
//       } else {
//         throw new Error(response.message || "Login failed");
//       }
//     } catch (err) {
//       // Handle error actions
//       console.error("Login error:", err.message);
//     }
//   };

//   // Rest of the Login component...
// };

const userLoggedInSuccess=()=>{
  //toast.success("Login Successfully!")
}

const userLoggedInFail=()=>{
 // toast.error("Login Failed!")
}
const Login = ({ setShowLogin, setCurrentUser }) => {
  const nameRef = useRef();
  const passRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const username = nameRef.current.value;
      const password = passRef.current.value;
  
      const resp = await axios.post("/users/login", { username, password });
  
      if (resp.data.errorCode === 200) {
        const { id, username, email, password, dateOfBirth, gender, createdAt, updatedAt } = resp.data.user;
        setCurrentUser(resp.data.user);
        userLoggedInSuccess();
      
        console.log(setCurrentUser);
        setShowLogin(false);
      } else {
        throw new Error(resp.data.message || "Login failed");
      }
    } catch (err) {
      userLoggedInFail();
      console.error("Login error:", err.message);
  };
}

  return (
    <div className="login_container">
      <div className="application">
        <ExitToAppIcon />
        Login to your profile
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        {/* <-- to retrieve data */}
        <input type="password" placeholder="password" ref={passRef} />
        <button className="login_button">Login</button>
      </form>
      <CancelIcon className="login_cancel" onClick={()=>setShowLogin(false)} />
    </div>
  );
};

export default Login;
