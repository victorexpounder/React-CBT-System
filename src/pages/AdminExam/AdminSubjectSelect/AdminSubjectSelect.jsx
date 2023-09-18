import React, { useContext, useEffect, useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop} from '@mui/material'
import { Menu } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import { Link } from 'react-router-dom';
import { WidgetTemp } from '../../../components/ExamsWidget/ExamsWidget';
import { TeacherSubject } from '../../../TeacherSubject';
import { UserContext } from '../../../contex/UserContext';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
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

    // const [subjects, setSubjects] = useState([]);
    const teacherSubjects = TeacherSubject();


    const [subjects, setSubjects] = useState(['Loading...']);

    const [subjectList, setSubjectList] = useState([
      ''
    ]);
    const [hodsubjectList, setHodSubjectList] = useState([
      ''
    ]);
    const [hodDepartments, setHodDepartments] = useState();
  
    // const fetchSubjects = async () => {
    //   try {
    //     const subjectArray = await TeacherSubject();
    //     setSubjects(subjectArray);
    //   } catch (error) {
    //     console.log("Error fetching teachers:", error);
    //   }
    // };

    const unsubscribeSubjectsD = onSnapshot(collection(db, 'subjects'), (querySnapshot) => {
      const subjectsData = [];
      querySnapshot.forEach((doc) => {
        const subject = doc.id;
        subjectsData.push(subject);
      });
      setSubjectList(subjectsData);
    });

    


  
    useEffect(() => {
  
      return () => {
        unsubscribeSubjectsD(); // Clean up the listener when the component unmounts
      };
    }, []);


    const fetchDepartments = () =>{
      const departmentsRef = collection(db, "departments");
      const q = query(departmentsRef, where("hodId", "==", currentUser.uid));

      // Set up a real-time listener using onSnapshot
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updateddepartments = [];
        querySnapshot.forEach((doc) => {
          updateddepartments.push(doc.id);
        });

        setHodDepartments(updateddepartments);
        console.log(updateddepartments);
      });

      return unsubscribe;
      
    }

    useEffect(() => {
      const unsubscribe = fetchDepartments(); // Call fetchDepartments directly
      return () => {
        unsubscribe(); // Clean up the listener when the component unmounts
      };
    }, []);

    const fetchHodSubjects = async() =>{
      if(hodDepartments.length > 0)
      {
        const hodSubRef = collection(db, "subjects");
        const q = query(hodSubRef, where("department", "in", hodDepartments));
        
        // Set up a real-time listener using onSnapshot
          const querySnapshot = await getDocs(q);
          const HodSubs = [];
          const HodSubsAll = [];

          querySnapshot.forEach((doc) => {
            const notEqual = teacherSubjects.every(item => item !== doc.id);
            HodSubsAll.push(doc.id);
            if(notEqual)
            {
              HodSubs.push(doc.id);
            }
          
          const updatedSubjectList = [...teacherSubjects, ...HodSubs];
          setSubjects(updatedSubjectList);
          localStorage.setItem('hodSubjects', JSON.stringify(HodSubsAll))
          console.log(updatedSubjectList);
        });

    }else{
        setSubjects(teacherSubjects);
    }
  }
    useEffect(()=>{
    
    fetchHodSubjects(); 

    },[hodDepartments]) 

    

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

            <div className="widget-container" style={{height: '70vh', overflowY: 'auto'}}>
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
