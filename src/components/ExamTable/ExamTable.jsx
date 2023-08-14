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
import { useEffect, useState } from "react";
import Teachersdata from "../../TeachersData";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const ExamTable = () => {
        let tableHead = ['subject', 'class', 'term', 'session' ]

        
      const subjects = TeacherSubject();
    // const [subjects, setSubjects] = useState();

  
    // const fetchSubjects = async () => {
    //   try {
    //     const subjectArray = await TeacherSubject();
    //     setSubjects(subjectArray);
    //   } catch (error) {
    //     console.log("Error fetching teachers:", error);
    //   }
    // };

    // fetchSubjects();

    const [examsList, setExamsList] = useState([]);
    const [examsOngoing, setExamsOngoing] = useState([]);

    const fetchExams = () => {
      if (subjects && subjects.length > 0) {
        const examsRef = collection(db, "exams");
        const q = query(examsRef, where('subject', 'in', subjects));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const exams = [];
          const examsP = [];
    
          snapshot.forEach((doc) => {
            const exam = doc.data();
            exams.push(exam);
    
            // Only push the exam to examsP if it meets the public criteria
            if (exam.public === true) {
              examsP.push(exam);
            }
          });
    
          setExamsList(exams);
          setExamsOngoing(examsP);
        });
    
        return unsubscribe; // Return the unsubscribe function
      }
    
      // If subjects is empty, return a no-op function
      return () => {};
    };
    

useEffect(() => {
  const unsubscribe = fetchExams();

  // Clean up the listener when the component unmounts or when the dependencies change
  return () => {
    unsubscribe();
  };
}, [subjects]); // Make sure to include 'subjects' as a dependency


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
        {examsOngoing.map((row) => (
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
