import React, { useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop} from '@mui/material'
import { Menu } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import { WidgetTemp } from '../../../components/ExamsWidget/ExamsWidget';
import { Link } from 'react-router-dom';
import './ClassP.scss'

export const ClassPage = () => {

  localStorage.removeItem("class");

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


    const [classList, setClassList] = useState([
      'SSS1',
      'SSS2',
      'SSS3',
      

   ]);

    function handleStore (theclass){
      localStorage.setItem("class", JSON.stringify(theclass));
    }

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
        <div className="title">
            <h1>Classes</h1>
          </div>
          <div className="widget-container">
            {classList.map((theclass) =>(
              <Link to={'/exams/class/term'} style={{textDecoration: 'none'}}>
              <div className="wi" onClick={() => handleStore(theclass)}>
              <WidgetTemp content={theclass} />
              </div>
              </Link>
              ))}
            </div>
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
