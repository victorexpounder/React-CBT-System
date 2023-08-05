import React, { useContext, useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop} from '@mui/material'
import { Menu } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import { Link } from 'react-router-dom';
import { WidgetTemp } from '../../../components/ExamsWidget/ExamsWidget';
import { TeacherSubject } from '../../../TeacherSubject';
import { UserContext } from '../../../contex/UserContext';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase';


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

    const [subjects, setSubjects] = useState([]);
    const [subjectList, setSubjectList] = useState([
      ''
    ]);
  
    const fetchSubjects = async () => {
      try {
        const subjectArray = await TeacherSubject();
        setSubjects(subjectArray);
      } catch (error) {
        console.log("Error fetching teachers:", error);
      }
    };

    const subjectsD = async () => {
      const usersRef = collection(db, "subjects");
      const q = query(usersRef);
      const querySnapshot = await getDocs(q); // Use await to wait for the result
    
      const subjectsData = [];
      querySnapshot.forEach((doc) => {
        
        const subject = doc.id;
     
        subjectsData.push(subject);
      });
      
      return subjectsData;
    };

    const fetchSubjectsD = async () => {
      const subjectsData = await subjectsD();
      setSubjectList(subjectsData);
    };

    fetchSubjects();
    fetchSubjectsD();

    const [userData, setUserData] = useState();
    const { currentUser } = useContext(UserContext);
    const userDocRef = doc(db, "users", currentUser.uid);
    const getUserDoc = async () => await getDoc(userDocRef);
    
    getUserDoc().then((userDoc) => {
         const data = userDoc.data()
         setUserData(data);
    })
    

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
          {userData?.role === "Director"?

            <div className="widget-container">
            {subjectList.map((subject) =>(
              <Link to={'/exams/class/term/subjects/subjectpage'} style={{textDecoration: 'none'}}>
                  <div className="wi" onClick={() => handleStore(subject)}>
                  <WidgetTemp content={subject} />
                  </div>
                  </Link>
                  ))}
            </div>
            :
            <div className="widget-container">
            {subjects.map((subject) =>(
              <Link to={'/exams/class/term/subjects/subjectpage'} style={{textDecoration: 'none'}}>
                  <div className="wi" onClick={() => handleStore(subject)}>
                  <WidgetTemp content={subject} />
                  </div>
                  </Link>
                  ))}
          </div>
          }
          
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
