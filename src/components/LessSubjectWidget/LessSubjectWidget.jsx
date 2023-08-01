import React, { useState } from 'react'
import "../SubjectWidget/SubWidget.scss";
import { Userdata } from '../../Userdata';
import { TeacherSubject } from '../../TeacherSubject';
import { Skeleton } from '@mui/material';


export const LessSubjectWidget = () => {
  const [subjects, setSubjects] = useState();
  
    const fetchTeachers = async () => {
      try {
        const subjectArray = await TeacherSubject();
        setSubjects(subjectArray);
      } catch (error) {
        console.log("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  
    
    

  return (
    <div className="container">
      <h1>Your Subjects:</h1>
      
      <div className="widget-container">
        {subjects? 

        <>

        {subjects?.map((subject) => (
          
          <div
          key={subject}
          className={`Rwidget`}
          >
            <div className="Title">
              <h2>{subject}</h2>
            </div>
            
            </div>

          ))}
          </>
          :
          <Skeleton variant="rounded" width={210} height={118} />
        }
        </div>
    </div>

  )
}
