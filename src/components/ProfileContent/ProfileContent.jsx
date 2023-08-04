import React, { useState, useRef, useContext, useEffect } from "react";
import { Avatar, Snackbar, Tooltip } from "@mui/material"; 
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./ProfileContent.scss";
import { Edit } from "@mui/icons-material";
import { updateEmail } from "firebase/auth";
import { UserContext } from "../../contex/UserContext";
import { auth, db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const ProfileContent = () => {
  const [userData, setUserData] = useState();
  const { currentUser } = useContext(UserContext);
  const userDocRef = doc(db, "users", currentUser.uid);
  const getUserDoc = async () => await getDoc(userDocRef);
  
  getUserDoc().then((userDoc) => {
       const data = userDoc.data()
       setUserData(data);
  })

  const [Updateemail, setUpdateEmail] = useState(userData?.email);
  const [Updatename, setUpdateName] = useState(userData?.fullname);
  const [showNameInput, setshowNameInput] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);
  const [profileUploaded, setProfileUploaded] = useState(false);
  const [profileFailed, setProfileFailed] = useState(false);
  const [nameUpdated, setNameUpdated] = useState(false);
  const [nameUpdatedError, setNameUpdatedError] = useState(false);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    // This effect will run whenever userData changes
    // Update Updatename with the current fullname value from userData
    setUpdateName(userData?.fullname);
  }, [userData?.fullname]);
  useEffect(() => {
    // This effect will run whenever userData changes
    // Update Updatename with the current fullname value from userData
    setUpdateEmail(userData?.email);
  }, [userData?.email]);

  function handleNameChange(event) {
    setUpdateName(event.target.value);
  }
  function handleEmailChange(event) {
    setUpdateEmail(event.target.value);
  }

  const handleNameSave = async (imgURL) => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      
      // Update the fullname and email fields in Firestore
      if(imgURL){
        await updateDoc(userDocRef, {
          profilePictureURL : imgURL
        });
        console.log("image added to database successfully");
      }else{
        // Update the user's email in Firebase Authentication
      await updateEmail(auth.currentUser, Updateemail);

      // Update the email field in Firestore 
        await updateDoc(userDocRef, {
          fullname: Updatename,
          email: Updateemail,
        });
        console.log("Fullname and email updated successfully!");
        setNameUpdated(true);
      }
      
     setshowNameInput(false)
    } catch (error) {
      console.log("Error updating fullname and email:", error);
      setNameUpdatedError(true)
    }
  };

  function handleShowinput(event) {
    setshowNameInput(true);
  }

  const handleProfilePictureChange = async(event) =>{
    setProfileUploading(true);
    const file = event.target.files[0];
    const fileType = file.type.split("/")[1]; // Get the file extension
    const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
  
  uploadBytes(storageRef, file)
    .then(() => getDownloadURL(storageRef))
    .then((downloadURL) => {
      handleNameSave(downloadURL); // Set the profile picture URL state with the download URL
      setProfileUploading(false);
      setProfileUploaded(true);
    })
    .catch((error) => {
      console.log("Error uploading profile picture:", error);
      setProfileUploading(false);
      setProfileFailed(true);
    });
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
          src={userData?.profilePictureURL}
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
          defaultValue={userData.email}
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
        
        <Snackbar
          open={profileUploading}
          message="Image Uploading..."
        />
        <Snackbar
          open={profileUploaded}
          autoHideDuration={6000}
          onClose={() => setProfileUploaded(false)}
          message="Profile Picture Uploaded, might take a minute to reflect or refresh page"
        />
        <Snackbar
          open={profileFailed}
          autoHideDuration={6000}
          onClose={() => setProfileFailed(false)}
          message="ooppss.. Error Uploading Profile Picture"
        />
        <Snackbar
          open={nameUpdated}
          autoHideDuration={6000}
          onClose={() => setNameUpdated(false)}
          message="Name and Email Successfully changed"
        />
        <Snackbar
          open={nameUpdatedError}
          autoHideDuration={8000}
          onClose={() => setNameUpdatedError(false)}
          message="OOPPSS.. Name and Email change failed try a re-login to see if it resolves the issuse"
        />
    </div>
  );
};
