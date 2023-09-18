import React, { useContext, useEffect, useState } from 'react'
import './Home.scss'
import { SideBar } from '../../components/SideBar/SideBar'
import { Menu, Widgets } from '@mui/icons-material'
import { NavBar } from '../../components/NavBar/NavBar'
import { Widget } from '../../components/widget/widget'
import { Tablec } from '../../components/Table/Table'
import { ExamTable } from '../../components/ExamTable/ExamTable'
import { Backdrop } from '@mui/material'
import { AccountCard } from '../../components/AccountCard/AccountCard'
import { db } from '../../firebase'
import { UserContext } from '../../contex/UserContext'
import { doc, getDoc } from 'firebase/firestore'
import { Navigate, useNavigate } from 'react-router-dom'

export const Home = () => {

  const navigate = useNavigate();

  const RequireAdmin = async () =>{
    const userDocRef = doc(db, "users", currentUser.uid);
    const UserDoc = await getDoc(userDocRef);
    const isAdmin = UserDoc.exists();
    if (!isAdmin){
      navigate('/selectExam')
    }
}
  
  useEffect(()=>{
    RequireAdmin();
  }, [])

  const [sidetoggle, setSidetoggle] = useState('hidden')
  const [userData, setUserData] = useState();
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

    const { currentUser } = useContext(UserContext);
    const userDocRef = doc(db, "users", currentUser.uid);
    const getUserDoc = async () => await getDoc(userDocRef);
    
    getUserDoc().then((userDoc) => {
         const data = userDoc.data()
         setUserData(data);
    })

  return (
    <div className='home'>
      <div className={`sideBar ${sidetoggle}`}>
      <SideBar />
      </div>
      
      <div className={`menu`} onClick={hideMenu}>
      <Menu />
      </div>
      <div className="homeContainer" onClick={showMenu}>
        <NavBar handleOpen={handleOpen}/>
        <div className="widgets">
          
          <Widget type={userData?.role ==='Director'? "teacherApproved" : "subjects"}/>
          <Widget type={userData?.role ==='Director'? "teacherUnapproved" : "examTotal"}/>
          <Widget type={userData?.role ==='Director'? "teacherTotal" : "examOngoing"}/>
          
          
        </div>
        <div className="listContainer">
          <div className="listTitle"> {userData?.role === 'Director'? "Latest Registered Teachers": "Ongoing Exams"} </div>
          {userData?.role === 'Director'? <Tablec/> : <ExamTable/>}
           
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
