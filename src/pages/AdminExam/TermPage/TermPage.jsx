import React, { useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop} from '@mui/material'
import { Menu } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import { WidgetTemp } from '../../../components/ExamsWidget/ExamsWidget';
import { Link } from 'react-router-dom';

export const TermPage = () => {
    localStorage.removeItem("term");

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


    const [termList, setTermList] = useState([
      'First',
      'Second',
      'Third',
      

   ]);

    function handleStore (term){
      localStorage.setItem("term", JSON.stringify(term));
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
            <h1>Term</h1>
          </div>
          <div className="widget-container">
            {termList.map((term) =>(
              <Link to={'/exams/class/term/subjects'} style={{textDecoration: 'none'}}>
              <div className="wi" onClick={() => handleStore(term)}>
              <WidgetTemp content={term} />
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
