import React, { useState, useRef, useContext } from "react";
import { Avatar, Tooltip } from "@mui/material"; 
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./ProfileContent.scss";
import { Edit } from "@mui/icons-material";
import { updateEmail } from "firebase/auth";
import { UserContext } from "../../contex/UserContext";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const ProfileContent = () => {
  const [userData, setUserData] = useState();
  const { currentUser } = useContext(UserContext);
  const userDocRef = doc(db, "users", currentUser.uid);
  const getUserDoc = async () => await getDoc(userDocRef);
  
  getUserDoc().then((userDoc) => {
       const data = userDoc.data()
       setUserData(data);
  })

  const [Updateemail, setUpdateEmail] = useState();
  const [Updatename, setUpdateName] = useState();
  const [showNameInput, setshowNameInput] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  function handleNameChange(event) {
    setUpdateName(event.target.value);
  }
  function handleEmailChange(event) {
    setUpdateEmail(event.target.value);
  }

  const handleNameSave = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      
      // Update the fullname and email fields in Firestore
      await updateDoc(userDocRef, {
        fullname: Updatename,
        email: Updateemail,
      });
  
      console.log("Fullname and email updated successfully!");
     setshowNameInput(false)
    } catch (error) {
      console.log("Error updating fullname and email:", error);
    }
  };

  function handleShowinput(event) {
    setshowNameInput(true);
  }

  function handleProfilePictureChange(event) {
    setProfilePicture(URL.createObjectURL(event.target.files[0]));
  }

  function handleAvatarClick() {
    fileInputRef.current.click();
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleNameSave();
    // Submit form data to server here
  }

  const avatarStyle = {
    width: "150px",
    height: "150px",
    margin: "auto",
    marginBottom: "20px",
    cursor: "pointer",
    position: "relative"
  };

  const cameraIconStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    
  };
  
  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile Page</h1>
      <div className="profile-card">
      <Tooltip title="upload profile">
        <Avatar
          src={profilePicture}
          alt={userData?.fullname}
          style={avatarStyle}
          className="profile-avatar"
          onClick={handleAvatarClick}
        >
          {userData?.fullname.charAt(0)}
          <div style={cameraIconStyle} className="camIcon">
            <CameraAltIcon />
          </div>
        </Avatar>
        </Tooltip>
        <h2 className="profile-name">
          {userData?.fullname}  
          <Tooltip title="Edit Name">
         <Edit onClick={handleShowinput} className="edit"/>
          </Tooltip>
         </h2>
        <h4 className="email">
          {currentUser.email} 
          <Tooltip title="Edit Email">
         <Edit onClick={handleShowinput} className="edit"/>
          </Tooltip>
         </h4>
      </div>
      <form onSubmit={handleSubmit}>
        {showNameInput && 
        <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          required
          type="text"
          id="name"
          value={Updatename}
          defaultValue={userData.fullname}
          onChange={handleNameChange}
          className="form-input"
        />
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          required
          type="email"
          id="email"
          value={Updateemail}
          onChange={handleEmailChange}
          className="form-input"
        />
      </div>
        }
        
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="file-input"
          ref={fileInputRef}
        />
        {showNameInput &&
          <button type="submit" className="fbutton" >
          Save Changes
          </button>
        }
        </form>
        
      
    </div>
  );
};
