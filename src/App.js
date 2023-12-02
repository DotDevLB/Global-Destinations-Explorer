import "./App.css";
import * as React from "react";
import { Map, NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PlaceIcon from "@mui/icons-material/Place";
import axios, { Axios } from "axios";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
//import ChatRoom from "./Components/ChatRoom/ChatRoom";
import Profile from "./Components/Profile/Profile";
import StarIcon from "@mui/icons-material/Star";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "timeago.js";

import { useState, useRef, useEffect } from "react";
//import { toastContianer, toast, ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";


const apiKey = "dda740db6b0d79b6dd3a695593eede9d";

const pinAddSuccess = () => {
 // toast.success("Added pin!");
};
const UserNotLoggedIn = () => {
 // toast.warning("Login to account to set pins!");
};
const userLoggedOut = (userS) => {
//toast.warning("Logout from " + userS);
};
const pinAddFailure = () => {
  //toast.error("Couldn't add pin. Please fill all data!");
};
const pinDeleteSuccess = () => {
  //toast.success("Pin Deleted successfully!");
};

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [pins, setPins] = React.useState([]);
  const [showUserPopup, setShowUserPopup] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [viewPort, setViewPort] = React.useState({
    longitude: 25,
    latitude: 40,
    zoom: 14,
  });
  const [weather, setWeather] = React.useState(null);
  const [currentPlaceId, setCurrenPlaceId] = React.useState(null);
  const [latitudee, setLatitude] = React.useState(null);
  const [longitudee, setLongitude] = React.useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const handleMarkerClicked = (id, userName, lat, lon) => {
    setCurrenPlaceId(id);
    console.log(userName);
  };
  const handleWeather = (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const weatherData = response.data;
        const temperatureKelvin = weatherData.main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15;
        setWeather(temperatureCelsius.toFixed(2));
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      });
  };
  const getWeatherColor = (temperature) => {
    if (temperature >= 35) {
      return "lightcoral"; // A lighter shade of red
    } else if (temperature >= 28 && temperature < 35) {
      return "lightsalmon"; // A lighter shade of orange
    } else if (temperature >= 22 && temperature < 28) {
      return "lightyellow"; // A lighter shade of yellow
    } else if (temperature >= 17 && temperature < 22) {
      return "lightgreen"; // A lighter shade of green
    } else if (temperature >= 12 && temperature < 17) {
      return "lightblue"; // A lighter shade of blue
    } else {
      return "lightcyan"; // A lighter shade of cyan
    }
  };

  const titleRef = useRef(null);
  const ratingRef = useRef(null);
  const descrRef = useRef(null);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    try {
      const userName = currentUser.username;
      const title = titleRef.current.value;
      const rating = ratingRef.current.value;
      const latitude = newPlace.lat;
      const longitude = newPlace.lng;
      const descr = descrRef.current.value;

      if (currentUser == null) {
        UserNotLoggedIn();
      } else {
        const resp = await axios.post("/pins/create", {
          userName,
          title,
          rating,
          latitude,
          longitude,
          descr,
        });

        if (resp.data.errorCode === 200) {
          pinAddSuccess();
          console.log(resp.data.message);

          const newPin = {
            id: resp.data.id,
            userName,
            title,
            rating,
            latitude,
            longitude,
            descr,
            createdAt: new Date().toISOString(),
          };
          setPins([...pins, newPin]);
          setNewPlace(null);
        } else {
          throw new Error(resp.data.message || "Pin creation failed");
        }
      }
    } catch (err) {
      pinAddFailure();
      console.error("Pin creation error:", err.message);
    }
  };

  const handlePinDelete = async (pinId) => {
    try {
      const response = await axios.delete(`/pins/delete/${pinId}`);
      console.log(pinId);
      if (response.data.errorCode === 200) {
        console.log(response.data.message);
        pinDeleteSuccess();
        const updatedPins = pins.filter((pin) => pin.id !== pinId);
        setPins(updatedPins);
        setNewPlace(null);
      } else {
        throw new Error(response.data.message || "Pin deletion failed");
      }
    } catch (error) {
      console.error("Pin deletion error:", error.message);
    }
  };

  const handlePinUpdate = async () => {};
  const [newPlace, setNewPlace] = React.useState(null);
  const handleUsernameClick = async (username) => {
    try {
      const response = await axios.post(`/users/getUser/${username}`);
      const user = response.data.user;

      if (user) {
        console.log("User information:", user);
        setSelectedUser(user); // Store the user data
        setShowUserPopup(true); // Show the popup
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error
    }
  };
  const handleLogout = () => {
    userLoggedOut(currentUser.username);
    setCurrentUser(null);
    console.log(currentUser);
  };
  const handleAddClick = (e) => {
    let lat = e.lngLat.lat;
    let lon = e.lngLat.lng;

    setNewPlace({
      lat: lat,
      lng: lon,
    });
  };

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const resp = await axios.get("/pins/getAll");
        setPins(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleChatRoom=async(pinId)=>{

  }


  return (
    <div>
      <Map
        container={"map"}
        projection={"globe"}
        initialViewState={{ viewPort }}
        mapboxAccessToken={process.env.REACT_APP_TOKEN}
        mapStyle="mapbox://styles/joe-hadchity/clozm9s84001i01qtgs718ugj"
        style={{ width: "100vw", height: "100vh" }}
        onDblClick={handleAddClick}
      >
        '
        {/* <ToastContainer postiotion="top-left" theme="dark" /> */}
        <NavigationControl />
        {pins.map((p) => (
          <>
            <Marker
              longitude={p.longitude}
              latitude={p.latitude}
              anchor="center"
            >
              <PlaceIcon
                className="icon"
                onClick={() => {
                  handleMarkerClicked(
                    p.id,
                    p.userName,
                    p.latitude,
                    p.longitude
                  );
                  console.log(p);
                  handleWeather(p.latitude, p.longitude);
                }}
                style={{
                  fontSize: viewPort.zoom * 2,
                  color:
                    currentUser && p.userName === currentUser.username
                      ? "tomato"
                      : "slateblue",
                }}
              />
            </Marker>
            {p.id === currentPlaceId && (
              <Popup
                longitude={p.longitude}
                latitude={p.latitude}
                closeOnClick={false}
                closeOnMove={false}
                anchor="left"
                onClose={() => {
                  setCurrenPlaceId(null);
                  setWeather(null);
                  console.log(weather);
                }}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="descr">{p.descr}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array.from({ length: p.rating }, (_, index) => (
                      <StarIcon key={index} className="star" />
                    ))}
                  </div>
                  <label>Actual Weather</label>
                  <div
                    className="weather"
                    style={{ color: getWeatherColor(weather) }}
                  >
                    {weather}
                  </div>

                  <label>Information</label>
                  <div className="info">
                    {currentUser && (
                      <div className="user-info">
                        <span
                          className="username"
                          onClick={() => handleUsernameClick(p.userName)}
                        >
                          Created by <b>{p.userName}</b>
                        </span>
                        <button
                          className="chatButton"
                          onClick={() => handleChatRoom(p.id)}
                        >
                          Chat
                        </button>
                      </div>
                    )}
                    <span className="date">
                      {format(p.createdAt)}

                      {currentUser && currentUser.username === p.userName && (
                        <div className="button-container">
                          <button
                            className="updateButton"
                            onClick={() => handlePinUpdate()}
                          >
                            Edit
                          </button>
                          <button
                            className="deleteButton"
                            onClick={() => handlePinDelete(p.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
        {showUserPopup && (
          <div className="user-popup">
            <div className="user-header">
              <img
                src={selectedUser.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <h2>{selectedUser.username}</h2>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Created:</strong> {selectedUser.createdAt}
              </p>
            </div>
            <div className="user-footer">
              <CancelIcon
                className="cancelButton"
                onClick={() => setShowUserPopup(false)}
              />
            </div>
          </div>
        )}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnClick={false}
            closeOnMove={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form className="fform" onSubmit={handlePinSubmit}>
                <label>Title</label>
                <input placeholder="Enter a title..." ref={titleRef} />
                <label>Description</label>
                <textarea
                  placeholder="Say somthing about this place..."
                  ref={descrRef}
                />
                <label>Rating</label>
                <select ref={ratingRef}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <button className="submitButton" type="submit">
                  Add pin!
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>

      <div className="footer">
        <div className="footer_down">
          {currentUser ? (
            <>
              <button className="button logout" onClick={() => handleLogout()}>
                Log out
              </button>
              {/* <label className="userNameLabel" onClick={()=>setShowProfile(true)}>{currentUser.username}</label> */}
              {currentUser && (
                <label
                  className="userNameLabel"
                  onClick={() => setShowProfile(true)}
                >
                  {currentUser.username}
                </label>
              )}
            </>
          ) : (
            <div>
              <button
                className="button login"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className="button register"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
      {showProfile && (
        <Profile
          setShowProfile={setShowProfile}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default App;
