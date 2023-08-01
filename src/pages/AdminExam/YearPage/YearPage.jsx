import React, { useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Tooltip} from '@mui/material'
import { Delete, Menu } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import { WidgetTemp } from '../../../components/ExamsWidget/ExamsWidget';
import './YearPage.scss';
import { Link } from 'react-router-dom'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const YearPage = () => {
    
  localStorage.removeItem("session");
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

    const [dopen, setDopen] = useState(false);
    const handleDclose = () => {
        setDopen(false);
    };
    const handleDopen = () => {
        setDopen(true);
    };

    const [sessionList, setSessionList] = useState([]);
    const [nextYear, setNextYear] = useState('');
    const fetchSubjects = async () =>{
      try{

        const sessionRef = collection(db, "session");
        const q = query(sessionRef);
        const querySnapshot = await getDocs(q);
        const sessions = [];
        
        querySnapshot.forEach((doc) => {
          const session = doc.id;
          sessions.push(session);
        })
        setSessionList(sessions);
        getNextYear();
        
      }
      catch(error){
        console.log(error);
      }
    }

    fetchSubjects();
    
    const getNextYear = () =>{
        const lastYear =  sessionList[sessionList.length - 1];
        const lastYearParts = lastYear.split('-'); // Split the year into two parts
        const nextYearPart = parseInt(lastYearParts[0]) + 2; // Increment the second part of the year
        const nextYear = `${lastYearParts[1]}-${nextYearPart}`; // Construct the next year
        setNextYear(nextYear);
    }
      
        
      
    
  

    function handleStore (year){
      localStorage.setItem("session", JSON.stringify(year));
    }

    const handleAddSession = () =>{
      
      const userDocRef = doc(db, 'session', nextYear);
      setDoc(userDocRef, { teacher : null},); 
      handleDclose();
  

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
        <div className="yearCont">
          <div className="title">
            <h1>All Session</h1>
          </div>

          <div className="addSessButton">
            <Tooltip title='Add a new session' arrow>
          <Button variant="contained" startIcon={<AddBoxIcon/>} className='dbutton' onClick={handleDopen}>
            Session
          </Button>
            </Tooltip>
          </div>

          <div className="widget-container">
            {sessionList.map((year) =>(
              <Link to={'/exams/class'} style={{textDecoration: 'none'}}>
              <div className="wi" onClick={() => handleStore(year)}>
              <WidgetTemp content={year} />
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


      <Dialog
        open={dopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDclose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Are you sure you want to add ${nextYear} Session?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Any session you add will be added generally to the whole application's database (everyone, not just you)
            and can't be deleted unless the developer is being contacted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSession}>Yes</Button>
          <Button onClick={handleDclose}>No</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}
