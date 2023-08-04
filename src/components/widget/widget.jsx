import {BookOutlined, ComputerOutlined, KeyboardArrowUp,PersonOutlined } from '@mui/icons-material'
import './widget.scss'
import { red } from '@mui/material/colors';
import { Userdata } from '../../Userdata';
import Teachersdata from '../../TeachersData';
import { useEffect, useState } from 'react';
import { TeacherSubject } from '../../TeacherSubject';
import { Exams } from '../../Exams';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
export const Widget = ({type}) => {

    let data;
    const userData = Userdata();
    const [teachers, setTeachers] = useState(null);

      const fetchTeachers = async () => {
        try {
          const teachersData = await Teachersdata("Teacher", "Principal");
          setTeachers(teachersData);
        } catch (error) {
          console.log('Error fetching teachers:', error);
        }
      };
    

        fetchTeachers();


      console.log(teachers);
    const approvedTeachers = teachers?.filter((teacher) => teacher.approved === true);
    const unApprovedTeachers = teachers?.filter((teacher) => teacher.approved === false);

    const [subjects, setSubjects] = useState();
  
    const fetchSubjects = async () => {
      try {
        const subjectArray = await TeacherSubject();
        setSubjects(subjectArray);
      } catch (error) {
        console.log("Error fetching teachers:", error);
      }
    };

    fetchSubjects();

    const [examsList, setExamsList] = useState([]);
    const [examsOngoing, setExamsOngoing] = useState([]);

  const fetchExams = async () =>{
    try{
    const examsRef = collection(db, "exams");
    const q = query(examsRef, where('subject', 'in', subjects));
    const qP = query(examsRef, where('subject', 'in', subjects),  where("public", "==", true));
    const querySnapshot = await getDocs(q);
    const querySnapshotP = await getDocs(qP);
    const exams = [];
    const examsP = [];

    querySnapshot.forEach((doc) => {
      const exam = doc.data(); // Call the function to get the actual data
      exams.push(exam);
    });
    querySnapshotP.forEach((doc) => {
      const examP = doc.data(); // Call the function to get the actual data
      examsP.push(examP);
    });
    
    setExamsList(exams);
    setExamsOngoing(examsP);
    
      
      
    }
    catch(error){
      console.log(error);
    }
  }

  // Fetch exams from Firebase when the component mounts
  fetchExams();
  
      

    switch(type){
      case "teacherApproved":
        data={
        title: "TEACHERS",
        link: "see all approved teachers",
        icon: <PersonOutlined className='icon' style={{color: "green", backgroundColor: "rgba(0, 255, 0, 0.2)"}}/>,
        topText: "Approved",
        color: "positive",
        numbers: approvedTeachers?.length
        };
        break;
      case "teacherUnapproved":
        data={
        title: "TEACHERS",
        link: "see all unapproved teachers",
        icon: <PersonOutlined className='icon' style={{color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}}/>,
        topText: "UnApproved",
        color: "negative",
        numbers: unApprovedTeachers?.length
        };
        break;
      case "teacherTotal":
        data={
        title: "TEACHERS",
        link: "see all teachers",
        icon: <PersonOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total",
        numbers: teachers?.length
        };
        break;
      case "subjects":
        data={
        title: "SUBJECTS",
        link: "see your Subjects",
        icon: <BookOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total",
        numbers : subjects?.length
        };
        break;
      case "examTotal":
        data={
        title: "EXAMS",
        link: "see all your exams",
        icon: <ComputerOutlined className='icon' style={{color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)"}}/>,
        topText: "Total",
        numbers : examsList.length
        };
        break;
      case "examOngoing":
        data={
        title: "EXAMS",
        link: "see all ongoing exams",
        icon: <ComputerOutlined className='icon' style={{color: "green", backgroundColor: "rgba(0, 255, 0, 0.2)"}}/>,
        topText: "Ongoing",
        color: "positive",
        numbers : examsOngoing.length
        };
        break;
        default:
          break;
    }
  return (
    <div className='widget'>
        <div className="right">
          <span className="title">{data.title}</span>
          <span className="counter">{data.numbers? data.numbers : "___"}</span>
          <span className="link">{data.link}</span>
        </div>
        <div className="left">
          <div className={`percentage ${data.color}`}>
            <KeyboardArrowUp/>
            {data.topText}
          </div>
          {data.icon}
        </div>
    </div>
  )
}
