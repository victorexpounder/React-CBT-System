import React, { useEffect, useState } from "react";
import "./SubWidget.scss";

import { Edit, Person } from "@mui/icons-material";
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Teachersdata from "../../TeachersData";

export const SubjectWidget = () => {
  const [subjectList, setSubjectList] = useState([
    ''
  ]);

  const [teachersList, setTeachersList] = useState('none')

  useEffect(() => {
    // Set up the real-time listener for subjects data
    const unsubscribeSubjects = onSnapshot(collection(db, "subjects"), (snapshot) => {
      const updatedSubjects = [];
      snapshot.forEach((doc) => {
        const subjectData = doc.data();
        const subject = {
          name: doc.id,
          ...subjectData,
        };
        updatedSubjects.push(subject);
      });
      setSubjectList(updatedSubjects);
    });

    // Set up the real-time listener for teachers data
    const unsubscribeTeachers = Teachersdata("Teacher", "Principal", (users) => {
      setTeachersList(users);
    });

    // Clean up the listeners when the component unmounts
    return () => {
      unsubscribeSubjects();
      unsubscribeTeachers();
    };
  }, []);
  
  
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [SelectedTeacher, setSelectedTeacher] = useState('none');
    const handleEditClick = (subjectName, teacher, id) => {
    setSelectedSubject(subjectName);
    setSelectedTeacher(teacher + "-" + id)
  };
  const handleClose = () => {
    setSelectedSubject(null);
    setSelectedTeacher("");
  };

    const handleChange = (event) => {
      setSelectedTeacher(event.target.value || '');
    };
    const handleUpdate = async(subname) => {
      

      try {
        const teacherDetails = SelectedTeacher.split("-");
        const userDocRef = doc(db, "subjects", subname);
        
        // Update the fullname and email fields in Firestore
        await updateDoc(userDocRef, {
          teacher: teacherDetails[0],
          teacherID: teacherDetails[1],
        });
    
        console.log(" updated successfully");
        setSelectedSubject(null);
      } catch (error) {
        console.log("Error updating fullname and email:", error);
        setSelectedSubject(null);
      }
      
      
    
    };

  const addSubject = () =>{
     const subjectName = prompt('Enter Subject Name');
     if(subjectName)
     {
       const userDocRef = doc(db, 'subjects', subjectName);
       setDoc(userDocRef, { teacher : null},); 
      }
  }

  return (
    <div className="container">
      <h1>All Subjects:</h1>

      <div className="addButton">
            <Tooltip title='Add a new subject' arrow>
          <Button variant="contained" startIcon={<AddBoxIcon/>} className='dbutton' onClick={addSubject} >
            Subject
          </Button>
            </Tooltip>
      </div>

      <div className="widget-container">
      
        {subjectList.map((subject) => (
          <div
            key={subject.name}
            className={`Rwidget ${selectedSubject === subject.name ? "due" : ""}`}
            
          >
            <Tooltip title="Edit" arrow>
            <div className="edit" onClick={() => handleEditClick(subject.name, subject.teacher, subject.teacherID)}>
              <Edit className="editicon"/>
            </div>
            </Tooltip>
            <div className="Title">
              <h2>{subject.name}</h2>
            </div>
            <div className="teacher">  <Person className="icon" /> {subject.teacher}</div>

            {selectedSubject && (
              <Dialog disableEscapeKeyDown open={Boolean(selectedSubject === subject.name)} onClose={handleClose}>
                <DialogTitle>Edit {subject.name} Teacher</DialogTitle>
                <DialogContent>
                  <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                    

                      <InputLabel id="demo-dialog-select-label">Teacher</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={SelectedTeacher}
                        onChange={handleChange}
                        input={<OutlinedInput label="Teacher" />}
                      >
                            <MenuItem
                              
                              value='n'
                              
                            >
                              none
                            </MenuItem>
                            {teachersList.map((teacher) => (
                            <MenuItem
                              key={teacher.userId}
                              value={`${teacher.fullname}-${teacher.userId}`}
                              
                            >
                              {teacher.fullname}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Tooltip title="Clicking ok will change subject allocated to teacher and previous teacher will no longer have access to subject" arrow>
                  <Button onClick={() => handleUpdate(subject.name)}>Ok</Button>
                  </Tooltip>
                </DialogActions>
              </Dialog>
            )}
            
          </div>
        ))}
      </div>
      
    </div>
  );
};


