import React, { useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop} from '@mui/material'
import { Menu } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import { Link } from 'react-router-dom';
import { WidgetTemp } from '../../../components/ExamsWidget/ExamsWidget';


export const AdminSubjectSelect = () => {

  localStorage.removeItem("subject");

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

    const [subjectList, setSubjectList] = useState([
      'English',
      'Mathematics',
      'Economics',
      'Biology',
      'Chemistry',

   ]);

   function handleStore (theclass){
    localStorage.setItem("subject", JSON.stringify(theclass));
  }
  return (
    <div>
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
            <h1>Subjects</h1>
          </div>
          <div className="widget-container">
            {subjectList.map((subject) =>(
              <Link to={'/exams/class/term/subjects/subjectpage'} style={{textDecoration: 'none'}}>
                  <div className="wi" onClick={() => handleStore(subject)}>
                  <WidgetTemp content={subject} />
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
    </div>
  )
}
