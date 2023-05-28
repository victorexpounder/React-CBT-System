import React, { useState, useRef } from "react";
import { Avatar, Tooltip } from "@mui/material"; 
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./ProfileContent.scss";
import { Edit } from "@mui/icons-material";
import { updateEmail } from "firebase/auth";

export const ProfileContent = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("janedoe@gmail.com");
  const [Updateemail, setUpdateEmail] = useState("janedoe@gmail.com");
  const [Updatename, setUpdateName] = useState(name);
  const [showNameInput, setshowNameInput] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  function handleNameChange(event) {
    setUpdateName(event.target.value);
  }
  function handleEmailChange(event) {
    setUpdateEmail(event.target.value);
  }
  function handleNameSave(event) {
    setName(Updatename);
    setEmail(Updateemail);
    setshowNameInput(false);
    
  }
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
          alt={name}
          style={avatarStyle}
          className="profile-avatar"
          onClick={handleAvatarClick}
        >
          {name.charAt(0)}
          <div style={cameraIconStyle} className="camIcon">
            <CameraAltIcon />
          </div>
        </Avatar>
        </Tooltip>
        <h2 className="profile-name">
          {name}  
          <Tooltip title="Edit Name">
         <Edit onClick={handleShowinput} className="edit"/>
          </Tooltip>
         </h2>
        <h4 className="email">
          {email} 
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
          type="text"
          id="name"
          value={Updatename}
          onChange={handleNameChange}
          className="form-input"
        />
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
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
          <button type="submit" className="fbutton" onClick={handleNameSave}>
          Save Changes
          </button>
        }
        </form>
        
      
    </div>
  );
};
