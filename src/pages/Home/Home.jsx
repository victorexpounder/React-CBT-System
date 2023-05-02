import React, { useState } from 'react'
import './Home.scss'
import { SideBar } from '../../components/SideBar/SideBar'
import { Menu, Widgets } from '@mui/icons-material'
import { NavBar } from '../../components/NavBar/NavBar'
import { Widget } from '../../components/widget/widget'
import { Tablec } from '../../components/Table/Table'
import { ExamTable } from '../../components/ExamTable/ExamTable'
export const Home = () => {
  
  const [sidetoggle, setSidetoggle] = useState('hidden')
  function hideMenu (){
    
    setSidetoggle('show')
  }
  function showMenu (){
    
    setSidetoggle('hidden')
    
  }
  return (
    <div className='home'>
      <div className={`sideBar ${sidetoggle}`}>
      <SideBar />
      </div>
      
      <div className={`menu`} onClick={hideMenu}>
      <Menu />
      </div>
      <div className="homeContainer" onClick={showMenu}>
        <NavBar/>
        <div className="widgets">
          <Widget type="teacherApproved"/>
          <Widget type="teacherUnapproved"/>
          <Widget type="teacherTotal"/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Registered Teachers</div>
          <Tablec/>

        </div>
      </div>
    </div>
  )
}
