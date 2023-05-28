
import React, { useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop, Button, Tooltip} from '@mui/material'
import { DeleteForever, Edit, Menu, Public } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import AddBoxIcon from '@mui/icons-material/AddBox';
import './SubjectSingle.scss'


export const SubjectSingle = () => {

  const year =  JSON.parse(localStorage.getItem('session'));
  const subject =  JSON.parse(localStorage.getItem('subject'));
  const term =  JSON.parse(localStorage.getItem('term'));
  const grade =  JSON.parse(localStorage.getItem('class'));
  const [examsList, setExamsList] = useState([])

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
    const handleAddExam = () =>{
        setExamsList([...examsList, 'exam202305'])
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
            <h1>{subject} {year} {term} term - {grade}</h1>
          </div>

          <div className="addExamButton">
            <Tooltip title="Add an exam" arrow>
          <Button variant="contained" startIcon={<AddBoxIcon/>} className='dbutton' onClick={handleAddExam}>
            EXAM
          </Button>
            </Tooltip>
          </div>

          <div className="examHistoryCon">
            <div className="examHistory">
              {(examsList.length !== 0 && 
                <div className="historyListCon">
                  {examsList.map((exam) =>(
                    <div className="historyList">
                    <h1>exam202305</h1>
                    <div className="icons">
                      <Edit/>
                      <DeleteForever/>
                      <Public/>
                    </div>
                    </div>
                  ))}
              </div>
                )}

                {(examsList.length === 0 &&
                  <div className="unavailable">
                  <h1>No Exams Available</h1>
                  </div>
                  )}
                
            </div>
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
