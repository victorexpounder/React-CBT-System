import React, { useState } from 'react'
import './Subject.scss'
import { NavBar } from '../../components/NavBar/NavBar'
import { Menu} from '@mui/icons-material'
import { SideBar } from '../../components/SideBar/SideBar'
import { Backdrop, Card, CardContent } from '@mui/material'
import { AccountCard } from '../../components/AccountCard/AccountCard'
import {SubjectWidget} from '../../components/SubjectWidget/SubjectWidget'
import { LessSubjectWidget } from '../../components/LessSubjectWidget/LessSubjectWidget'
import { Userdata } from '../../Userdata'

export const Subject = () => {

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

      const userData = Userdata();
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
      
      <div className="subjectWidgets">
        {userData?.role === 'Teacher'? <LessSubjectWidget/> : <SubjectWidget/>}
      
       
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
  )
}
