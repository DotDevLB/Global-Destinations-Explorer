import React, { useRef } from "react";
import "./Register.css";
import axios from "axios";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CancelIcon from "@mui/icons-material/Cancel";
//import{toast}from "react-toastify"
//import'react-toastify/dist/ReactToastify.css'

const userRegisterSuccess=()=>{
  //toast.success("Registered succesfully!")
}
const userRegisterFail=()=>{
 // toast.error("Failed to register!")
}

const Register = ({ setShowRegister }) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dateOfBirthRef = useRef();
  const genderRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const dateOfBirth = dateOfBirthRef.current.value;
      const gender = genderRef.current.value;

      const resp = await axios.post("/users/register", {
        username,
        email,
        password,
        dateOfBirth,
        gender,
      });
      console.log(resp.data);
      console.log("OK");
      userRegisterSuccess();
      setShowRegister(false);
    } catch (err) {
      console.log(err);
      userRegisterFail();
    }
  };

  return (
    <div className="register_container">
      <div className="application">
        <AccountBoxIcon />
        Create Your Profile
      </div>

      <form onSubmit={handleSubmit}>
      <div>
  <input type="text" name="username" placeholder="Username" ref={usernameRef} required/>
</div>
<div>
  <input type="email" name="email" placeholder="Email" ref={emailRef} required/>
</div>
<div>
  <input type="password" name="password" placeholder="Password" ref={passwordRef} required/>
</div>
<div>
  <input type="date" name="dateOfBirth" placeholder="Date of Birth" ref={dateOfBirthRef} required/>
</div>
<div>
  <select name="gender"  placeholder="gender" ref={genderRef} required>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>
        <button className="register_button" type="submit">Create Account</button>
      </form>

      <CancelIcon
        className="register_cancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
