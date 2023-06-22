import React, { useState } from "react";
import "./SubWidget.scss";

import { Edit, Person } from "@mui/icons-material";
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material";
export const SubjectWidget = () => {
  const [subjectList, setSubjectList] = useState([
    { name: "Math", teacher: "Ms. Smith" },
    { name: "Science", teacher: "Mr. Johnson" },
    { name: "English", teacher: "Ms. Lee" },
    { name: "biology", teacher: "Mr. Tori" },
    { name: "History", teacher: "Mr. Travis" },
  ]);

  const teachersList = [
    "Ms. Smith",
    "Mr. Johnson",
    "Ms. Lee",
    "Mr. Tori",
    "Mr. Travis"
  ]
  
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [SelectedTeacher, setSelectedTeacher] = useState('');
    const handleEditClick = (subjectName, teacher) => {
    setSelectedSubject(subjectName);
    setSelectedTeacher(teacher)
  };
  const handleClose = () => {
    setSelectedSubject(null);
    setSelectedTeacher("");
  };

    const handleChange = (event) => {
      setSelectedTeacher(event.target.value || '');
    };
    const handleUpdate = (subname) => {
      const updatedSubjectList = subjectList.map((subject) =>
      subject.name === subname ? { ...subject, teacher: SelectedTeacher } : subject
      );
      setSelectedSubject(null);
      setSubjectList(updatedSubjectList);
    
  };

  return (
    <div className="container">
      <h1>All Subjects:</h1>
      <div className="widget-container">
        {subjectList.map((subject) => (
          <div
            key={subject.name}
            className={`Rwidget ${selectedSubject === subject.name ? "due" : ""}`}
            
          >
            <Tooltip title="Edit" arrow>
            <div className="edit" onClick={() => handleEditClick(subject.name, subject.teacher)}>
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
                            {teachersList.map((teacher) => (
                            <MenuItem
                              key={teacher}
                              value={teacher}
                              
                            >
                              {teacher}
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


