import "./ExamTable.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from "@mui/material";
import { TeacherSubject } from "../../TeacherSubject";
import { useState } from "react";
import Teachersdata from "../../TeachersData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const ExamTable = () => {
  let rows=[
    {
        subject: "Economics",
        class: "SSS1",
        date: "2023/15/04"
        },
        {
        subject: "Agric",
        class: "SSS2",
        date: "2023/15/04"
        },
        {
        subject: "English",
        class: "SS3",
        date: "2023/15/04"
        }];
        let tableHead = ['subject', 'class', 'term', 'session' ]

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


  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">{tableHead[0]}</TableCell>
          <TableCell className="tableCell">{tableHead[1]}</TableCell>
          <TableCell className="tableCell">{tableHead[2]}</TableCell>
          <TableCell className="tableCell">{tableHead[3]}</TableCell>
          
          
        </TableRow>
      </TableHead>
      <TableBody>
        {examsList.map((row) => (
          <TableRow
            key={row.id}
          >
            <TableCell className="tableCell">{row.subject}</TableCell>
            <TableCell className="tableCell">{row.class}</TableCell>
            <TableCell className="tableCell">{row.term}</TableCell>
            <TableCell className="tableCell">{row.session}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
