import React, { useState } from "react";
import { Avatar, Backdrop } from "@mui/material"; 
import { ProfileContent } from "../../components/ProfileContent/ProfileContent";
import { SideBar } from "../../components/SideBar/SideBar";
import { NavBar } from "../../components/NavBar/NavBar";
import "./Profile.scss"

import { Menu } from "@mui/icons-material";
import { AccountCard } from "../../components/AccountCard/AccountCard";

 export const ProfilePage =() =>{
  
    const [sidetoggle, setSidetoggle] = useState('hidden')
  function hideMenu (){
    
    setSidetoggle('show')
  }
  function showMenu (){
    
    setSidetoggle('hidden')
    
  }

  const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

  return (
    <div className='subjectCon'>
        <div className={`sideBar ${sidetoggle}`}>
        <SideBar />
      </div>

      <div className={`menu`} onClick={hideMenu}>
      <Menu />
      </div>

      <div className="subjectContainer" onClick={showMenu}>
        <div className="navbar"><NavBar handleOpen={handleOpen}/></div>
        <div className="profileCont">
        <ProfileContent/>
        </div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        
        <AccountCard/>

      </Backdrop>
      </div>
      </div>
  );
}


