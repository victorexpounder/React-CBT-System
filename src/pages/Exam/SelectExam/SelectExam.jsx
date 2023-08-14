import React, { useEffect, useState } from 'react'
import './SelectExam.scss'
import { Logout } from '@mui/icons-material'
import { Autocomplete, TextField } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Exams } from '../../../Exams'
import { Navigate } from 'react-router-dom'
import { Route, useNavigate } from 'react-router-dom';

export const SelectExam = () => {
    useEffect(()=>{
        localStorage.removeItem("exam");
    }, [])
  
  
    const navigate = useNavigate();
    const [examsList, setExamsList] = useState();
    const [sessionList, setSessionList] = useState();
    const [subjectList, setSubjectList] = useState();
    const gradeList = [
        'SSS1',
        'SSS2',
        'SSS3'
    ];

    const termList = [
        'First',
        'Second',
        'Third'
    ];
    const loading = [
        'Loading..'
    ];

        const [yearf, setYearf] =  useState("");
        const [subjectf, setSubjectf] =  useState("");
        const [termf, setTermf] =  useState("");
        const [gradef, setGradef] =  useState("");
        
    
    

    const fetchSession = async () =>{
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
          
        }
        catch(error){
          console.log("error fetching sessions");
        }
    }

    const fetchExams = async () =>{
        
        
        try{
    
            const examsRef = collection(db, "exams");
            const q = query(examsRef, 
              where("session", "==", yearf),
              where("subject", "==", subjectf),
              where("term", "==", termf),
              where("class", "==", gradef),
              )
            const querySnapshot =  await getDocs(q);
            const exams = [];
        
            querySnapshot.forEach((doc) => {
              const exam = doc.id; // Call the function to get the actual data
              exams.push(exam);
            });

            
            
            setExamsList(exams);
            console.log('exam fetched');
        }
        catch(error){
          console.log(error);
        }
    }
    
      
    const subjects = async () => {
        const usersRef = collection(db, "subjects");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q); // Use await to wait for the result
      
        const subjectsData = [];
        querySnapshot.forEach((doc) => {
          const subjectData = doc.data();
          // Include the subject name in the subject object
          const subject = doc.id;
            
          subjectsData.push(subject);
        });
        
        return subjectsData;
      };
    
      const fetchSubjects = async () => {
        const subjectsData = await subjects();
        setSubjectList(subjectsData);
      };

      useEffect(()=>{
      fetchSession();
      fetchSubjects();
      },[])
      
      useEffect(()=>{
        fetchExams();
      },[yearf, subjectf, termf, gradef])

      const handleSubmit = (e)=>{
        e.preventDefault();
        if(yearf && subjectf && termf && gradef)
        {
            navigate("/cbt");
        }
      }
      
      

  return (
    <div className='selectView'>
        <div className="navBar">
            <h1>BCBT</h1>
            <div className="logout">
            <p>Log Out</p>
            <Logout/>
            </div>
        </div>

        <div className="content">
            <h3>Fill in details</h3>
            <div className="detailsCon">
            <TextField id="outlined-basic" label="Enter fullName" variant="outlined" fullWidth required onChange={(event)=>{localStorage.setItem("studentName", JSON.stringify(event.target.value))}}/>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={gradeList}
                fullWidth
                renderInput={(params) => <TextField {...params} label="class" required />}
                onInputChange={(event, newInputValue)=>{setGradef(newInputValue)}}
                />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={sessionList? sessionList : loading}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Select session" required/>}
                onChange={(event, newInputValue)=>{setYearf(newInputValue)}}

                />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={termList}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Term" required/>}
                onChange={(event, newInputValue)=>{setTermf(newInputValue)}}
                
                />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={subjectList? subjectList : loading}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Subject" required/>}
                onChange={(event, newInputValue)=>{setSubjectf(newInputValue)}}
                />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={examsList? examsList : loading}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Availabe Exams" required/>}
                onChange={(event, newInputValue)=>{localStorage.setItem("exam", JSON.stringify(newInputValue));}}
                />
            
            </div>
            <div className="proceedButton" onClick={handleSubmit}>
                Proceed
            </div>
        </div>
    </div>
  )
}
