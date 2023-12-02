import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import axios from "axios";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CancelIcon from "@mui/icons-material/Cancel";
//import { toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Profile = ({ setShowProfile, currentUser,setCurrentUser }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const[showUpdate,setUpdate]=React.useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const userUpdateSuccess = () => {
  //toast.success("User Updated Successfuly");
};
const userUpdateFail = () => {
 // toast.success("Faile to Update"+currentUser.username);
};
const[image,setImage]=useState('default.jpg')

useEffect(() => {
  axios.get(`/users/getProfilePicture/${currentUser.id}`)
    .then(res => {
      if (res.data && res.data[0] && res.data[0]) {
        setImage(res.data[0]);
      }
    })
    .catch(err => console.log(err));
}, [currentUser.id]);


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const [file, setFile] = useState();

const upload = () => {
  const formData = new FormData();
  formData.append('file', file);
  axios.post('/users/upload', formData, {
    params: { userId: currentUser.id}
  })
  .then(res => {
    if (res.data.Status === "Success") {
      console.log("ok");
    } else {
      console.log("error");
    }
  })
  .catch(err => console.log(err));
};
  
  // const handleUpdateProfile = () => {
  //   setUpdate(true);
  //   console.log(currentUser);
  // };

  const handleSubmit = async (e) => {
   // e.preventDefault(); 
    try {
      const { username, email, password,  gender } = currentUser;
  
      const response = await axios.put(`/users/updateUser/${currentUser.id}`, {
        username,
        email,
        password,       
        gender,
      });
  
      if (response.data.errorCode === 200) {
        setUpdate(false);
        console.log('User updated successfully');
        console.log(currentUser);
        userUpdateSuccess()
      } else {
        userUpdateFail();
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
<>
{showUpdate && (
  <div className="Uprofile">
    <h2>Profile Information</h2>
    <div className="Uprofile-details">
      <div className="Uuser-details">
        <p>
          <strong>Email:</strong>{' '}
          <input
            type="email"
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
        </p>
        <p>
          <strong>Password:</strong>{' '}
          <input
            type={showPassword ? "text" : "password"}
            value={currentUser.password}
            onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
          />
          <button onClick={togglePasswordVisibility}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </p>

        <p>
          <strong>Gender:</strong>{' '}
          <select
            value={currentUser.gender}
            onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </p>
        <button onClick={()=>handleSubmit()}>Update</button>
      </div>
      <div>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button type="button" onClick={upload}>Upload Profile Picture</button>
      </div>
      <div>
        <img src={`http://localhost:7000/server/Images/${image}`} 
       alt="" style={{width:"100px",height:"100px"}}/></div>
    </div>
    <CancelIcon className="cancelButton" onClick={() => setShowProfile(false)} />
  </div>
)}
   <div className="profile">
  <h2>Profile Information</h2>
  <div className="profile-details">
    <div className="user-details">
      <p><strong>Username:</strong> {currentUser.username}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p>
        <strong>Password:</strong>{' '}
        <span>
          {showPassword ? currentUser.password : currentUser.password.replace(/./g, '*')}
        </span>
        <button onClick={togglePasswordVisibility}>
          {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
        </button>
      </p>
      <p>
        <strong>Date of Birth:</strong>{' '}
        {new Intl.DateTimeFormat('en-GB').format(new Date(currentUser.dateOfBirth))}
      </p>
      <p><strong>Gender:</strong> {currentUser.gender}</p>
      <p><strong>Created At:</strong> {formatDate(currentUser.createdAt)}</p>
      
      <button onClick={()=>setUpdate(true)}>Edit Profile</button>
    </div>
    <div className="profile-image-container">
        <img
          src={`http://localhost:7000/server/Images/${image}`}
          alt="Profile"
          className="profile-image"
        />
      </div>
  </div>
  <CancelIcon
    className="cancelButton"
    onClick={() => setShowProfile(false)}
  />
</div>

    </>
  );
 
};

export default Profile;
