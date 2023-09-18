import React, { useEffect, useState } from "react";
import "./SubWidget.scss";
import { ArrowBack, Delete, Edit, Person } from "@mui/icons-material";
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, deleteDoc, where} from "firebase/firestore";
import { db } from "../../firebase";
import Teachersdata from "../../TeachersData";

export const SubjectWidget = () => {
  const [subjectList, setSubjectList] = useState([
    ''
  ]);
  const [artList, setArtList] = useState([
    ''
  ]);
  const [scienceList, setScienceList] = useState([
    ''
  ]);
  const [commerceList, setCommerceList] = useState([
    ''
  ]);

  const [teachersList, setTeachersList] = useState('none');
  const [departmentList, setDepartmentList] = useState([]);

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
      console.log(updatedSubjects);
      setSubjectList(updatedSubjects);
    });
    // fetching departments 
    const unsubscribeDepartments = onSnapshot(collection(db, "departments"), (snapshot) => {
      const updatedDepartments = [];
      snapshot.forEach((doc) => {
        const departmentData = doc.data();
        const subject = {
          name: doc.id,
          ...departmentData,
        };
        updatedDepartments.push(subject);
      });
      console.log(departmentList);
      setDepartmentList(updatedDepartments);
    });

    // Set up the real-time listener for teachers data
    const unsubscribeTeachers = Teachersdata("Teacher", "Principal", (users) => {
      setTeachersList(users);
    });

    

    // Clean up the listeners when the component unmounts
    return () => {
      unsubscribeSubjects();
      unsubscribeTeachers();
      unsubscribeDepartments();
    };
  }, []);
  
  useEffect(()=>{
    const artSubjects = [];
    const scienceSubjects = [];
    const commerceSubjects = [];
    if(subjectList)
    {
      for(let i = 0; i < subjectList.length; i++)
      {
        if(subjectList[i].department === 'art')
        {
          artSubjects.push(subjectList[i]);
      }else{
        if(subjectList[i].department === 'science')
        {
          scienceSubjects.push(subjectList[i]);
          
        }else{
          if(subjectList[i].department === 'commerce')
          commerceSubjects.push(subjectList[i]);
        }
      }
    }
  }

    console.log(scienceSubjects);
    setArtList(artSubjects);
    setScienceList(scienceSubjects);
    setCommerceList(commerceSubjects);
  
  }, [subjectList])
  
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [SelectedTeacher, setSelectedTeacher] = useState();
  const [SelectedHod, setSelectedHod] = useState();
  const [openD, setOpenD] = useState(false);
  const [add, setadd] = useState(false);
  const [subjectName, setSubjectName] = useState();
  const [department, setDepartment] = useState();
  const [showArt, setShowArt] = useState(false);
  const [showScience, setShowScience] = useState(false);
  const [showCommerece, setShowCommerce] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

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

    const handleHodUpdate = async(dept) => {
      try {
        const userDocRef = doc(db, "departments", dept);
        if(SelectedHod)
        {
          const teacherDetails = SelectedHod.split("-");
          // Update the fullname and email fields in Firestore
          await updateDoc(userDocRef, {
            hod: teacherDetails[0],
            hodId: teacherDetails[1],
          });
        }else{
          await updateDoc(userDocRef, {
            hod: null,
            hodId: null,
          });
        }
        
    
        console.log(" updated successfully");
        setSelectedDepartment(null);
      } catch (error) {
        console.log("Error updating fullname and email:", error);
        setSelectedDepartment(null);
      }
    };

    function capitalizeFirstLetter(inputString) {
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  const addSubject = () =>{
     if(subjectName)
     {
       const userDocRef = doc(db, 'subjects', capitalizeFirstLetter(subjectName));
       setDoc(userDocRef, { teacher : null, department} );
       setadd(false);
      }
  }

  const handleDelete = async(subname) =>{
    await deleteDoc(doc(db, "subjects", subname));
    setOpenD(false);
  }

  const showSubjectWidgets = (name) =>{
    switch (name)
    {
      case 'art' : setShowArt(true)
      break;
      case 'science' : setShowScience(true)
      break;
      case 'commerce' : setShowCommerce(true)
    }
  }
  return (
    <div className="container">
      <h1>All Subjects:</h1>

      <div className="addButton">
            <Tooltip title='Add a new subject' arrow>
              <Button variant="contained" startIcon={<AddBoxIcon/>} className='dbutton' onClick={()=> setadd(true)} >
                Subject
              </Button>
            </Tooltip>
            {(showArt || showScience || showCommerece )&&
              <Tooltip title='Go back' arrow>
              <Button variant="contained" startIcon={<ArrowBack/>} className='dbutton' onClick={()=>{setShowArt(false); setShowCommerce(false); setShowScience(false)}} >
              </Button>
            </Tooltip>
            }
      </div>


    
      <div className="widget-container">
        {/* department widgets */}
        {!showArt && !showScience && !showCommerece &&
        <>
        {/* art science and commerece category widget  */}

          {departmentList?.map((dept) => (
            
          <div className="Rwidget"  >
          <div className="toolsicons">
            <Tooltip title="Edit" arrow>
                <div className="edit" onClick={() =>{setSelectedDepartment(dept.name); setSelectedHod(dept.hod? dept.hod + "-" + dept.hodId : null)}} >
                  <Edit className="editicon" />
                </div>
            </Tooltip>
          </div>

          <div className="Title" onClick={()=> showSubjectWidgets(dept.name)}>
              <h2> {capitalizeFirstLetter(dept.name)} </h2>
          </div>

          <div className="teacher">  <Person className="icon" /> {dept.hod}</div>

            {/* edit HOD dialog  */}

            <Dialog disableEscapeKeyDown open={Boolean(selectedDepartment === dept.name)} onClose={handleClose}>
                <DialogTitle>Edit {dept.name} Head Of Department</DialogTitle>
                <DialogContent>
                  <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 1, minWidth: 320 }}>
                    

                      <InputLabel id="demo-dialog-select-label">HOD</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={SelectedHod}
                        onChange={(event)=> setSelectedHod(event.target.value)}
                        input={<OutlinedInput label="Teacher" />}
                        defaultValue={null}
                        >
                            <MenuItem
                              value = {null}
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
                  <Button onClick={()=> setSelectedDepartment(null)}>Cancel</Button>
                  <Tooltip title="Clicking ok will change subject allocated to teacher and previous teacher will no longer have access to subject" arrow>
                  <Button onClick={()=> handleHodUpdate(dept.name)}>Ok</Button>
                  </Tooltip>
                </DialogActions>
              </Dialog>

        </div>
          ))}
        </>
        }

        
        {showArt &&
        <>
        {artList.map((subject) => (
          <div
            key={subject.name}
            className={`Rwidget ${selectedSubject === subject.name ? "due" : ""}`}
            
          >
            <div className="toolsicons">

              <Tooltip title="Edit" arrow>
              <div className="edit" onClick={() => handleEditClick(subject.name, subject.teacher, subject.teacherID)}>
                <Edit className="editicon"/>
              </div>
              </Tooltip>

              <Tooltip title="Delete" arrow>
              <div className="edit" onClick={() => setOpenD(subject.name)}>
                <Delete className="editicon"/>
              </div>
              </Tooltip>
            </div>
            <div className="Title">
              <h2>{subject.name}</h2>
            </div>
            <div className="teacher">  <Person className="icon" /> {subject.teacher}</div>
              {/* edit dialog */}
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
                        defaultValue={"none"}
                      >
                            <MenuItem
                              value = {null}
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
            
            {/* delete dialog */}
            <Dialog
            open={Boolean(openD === subject.name)}
            onClose={()=> setOpenD(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
             >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete {subject.name}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Deleting this subject cannot be undone and exams related to this subjects might be lost
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=> setOpenD(false)}>Cancel</Button>
                  <Button onClick={()=> handleDelete(subject.name)} autoFocus>
                    Confirm 
                  </Button>
                </DialogActions>
            </Dialog>
          </div>
        ))}
        </>
      }

      {/* commerce widgets  */}

        {showCommerece &&
        <>
        {commerceList.map((subject) => (
          <div
            key={subject.name}
            className={`Rwidget ${selectedSubject === subject.name ? "due" : ""}`}
            
          >
            <div className="toolsicons">

              <Tooltip title="Edit" arrow>
              <div className="edit" onClick={() => handleEditClick(subject.name, subject.teacher, subject.teacherID)}>
                <Edit className="editicon"/>
              </div>
              </Tooltip>

              <Tooltip title="Delete" arrow>
              <div className="edit" onClick={() => setOpenD(subject.name)}>
                <Delete className="editicon"/>
              </div>
              </Tooltip>
            </div>
            <div className="Title">
              <h2>{subject.name}</h2>
            </div>
            <div className="teacher">  <Person className="icon" /> {subject.teacher}</div>
              {/* edit dialog */}
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
                        defaultValue="none"
                      >
                            <MenuItem
                              value='none'
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
            
            {/* delete dialog */}
            <Dialog
            open={Boolean(openD === subject.name)}
            onClose={()=> setOpenD(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
             >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete {subject.name}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Deleting this subject cannot be undone and exams related to this subjects might be lost
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=> setOpenD(false)}>Cancel</Button>
                  <Button onClick={()=> handleDelete(subject.name)} autoFocus>
                    Confirm 
                  </Button>
                </DialogActions>
            </Dialog>
          </div>
        ))}
        </>
      }

      {/* science widgets */}

        {showScience &&
        <>
        {scienceList.map((subject) => (
          <div
            key={subject.name}
            className={`Rwidget ${selectedSubject === subject.name ? "due" : ""}`}
            
          >
            <div className="toolsicons">

              <Tooltip title="Edit" arrow>
              <div className="edit" onClick={() => handleEditClick(subject.name, subject.teacher, subject.teacherID)}>
                <Edit className="editicon"/>
              </div>
              </Tooltip>

              <Tooltip title="Delete" arrow>
              <div className="edit" onClick={() => setOpenD(subject.name)}>
                <Delete className="editicon"/>
              </div>
              </Tooltip>
            </div>
            <div className="Title">
              <h2>{subject.name}</h2>
            </div>
            <div className="teacher">  <Person className="icon" /> {subject.teacher}</div>
              {/* edit dialog */}
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
                        defaultValue='none'
                      >
                            <MenuItem
                              value='none'
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
            
            {/* delete dialog */}
            <Dialog
            open={Boolean(openD === subject.name)}
            onClose={()=> setOpenD(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
             >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete {subject.name}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Deleting this subject cannot be undone and exams related to this subjects might be lost
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=> setOpenD(false)}>Cancel</Button>
                  <Button onClick={()=> handleDelete(subject.name)} autoFocus>
                    Confirm 
                  </Button>
                </DialogActions>
            </Dialog>
          </div>
        ))}
        </>
      }
      </div>

        {/* add dialog */}

      <Dialog disableEscapeKeyDown open={add} onClose={() => setadd(false)}>
                <DialogTitle>Add Subject</DialogTitle>
                <DialogContent>
                  <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
                  <TextField
                    sx={{m: 1, minWidth: 300, }}
                    label="Subject Name"
                    onChange={(event) => setSubjectName(event.target.value)}
                  />
                    
                    <FormControl sx={{ m: 1, minWidth: 300}} >
                      <InputLabel id="demo-dialog-select-label">Department</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        onChange={(event) => setDepartment(event.target.value)}
                        input={<OutlinedInput label="Teacher" />}
                      >
                            <MenuItem value='science'>
                              Science
                            </MenuItem>
                            <MenuItem value='art'>
                              Art
                            </MenuItem>
                            <MenuItem value='commerce'>
                              Commerce
                            </MenuItem>
                            
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=> setadd(false)}>Cancel</Button>
                  <Tooltip title="Clicking ok will change subject allocated to teacher and previous teacher will no longer have access to subject" arrow>
                  <Button onClick={addSubject} >Ok</Button>
                  </Tooltip>
                </DialogActions>
              </Dialog>
      
    </div>
  );
};


