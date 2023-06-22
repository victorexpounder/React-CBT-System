
import React, { useEffect, useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, Input, InputLabel, MenuItem, Paper, Select, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip} from '@mui/material'
import { ArrowBack, Article, DeleteForever, Edit, Label, Menu, Public, PublicOff, Publish, Save } from "@mui/icons-material";
import { NavBar } from '../../../components/NavBar/NavBar'
import { AccountCard } from '../../../components/AccountCard/AccountCard'
import AddBoxIcon from '@mui/icons-material/AddBox';
import './SubjectSingle.scss'


export const SubjectSingle = () => {

  const year =  JSON.parse(localStorage.getItem('session'));
  const subject =  JSON.parse(localStorage.getItem('subject'));
  const term =  JSON.parse(localStorage.getItem('term'));
  const grade =  JSON.parse(localStorage.getItem('class'));
  const [examsList, setExamsList] = useState([])
  const [selectedExam, setSelectedExam] = useState();
  const [deleteExam, setDeleteExam] = useState(null);
  const [showAddDialouge, setShowAddDialouge] = useState(false);
  const [examName, setExamName] = useState(null);
  const [examNameError, setExamNameError] = useState(false);
  const [value, setValue] = useState();
  const [qnoerr, setqnoerr] = useState(false);
  const [opValue, setOpValue] = useState(() => {
    const initialArray = [];
    for (let i = 0; i < 10; i++) {
      initialArray.push([]);
    }
    return initialArray;
  });
  const [opSelectValue, setOpselectValue] = useState(() => {
    const initialArray = [];
    for (let i = 0; i < 10; i++) {
      initialArray.push([]);
    }
    return initialArray;
  });
  const [qValue, setQvalue] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    // Update the value of the select when qIndex changes
    setOpselectValue((prevOpSelectValue) => {
      // Make a copy of the previous state to avoid mutations
      const updatedOpSelectValue = [...prevOpSelectValue];
      // Update the value for the corresponding question and option
      updatedOpSelectValue[qIndex][0] = true;
      // Return the updated state
      return updatedOpSelectValue;
    });
  }, [qIndex]);


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
    const handleAddExam = () =>{
      if (examName) {
        setqnoerr(false)
        console.log(value);
        if(value > 0)
        {
          const newExam = {
            name: examName,
            public: false,
            questionNo : value,
            questions : [
              
            ]
          };

          for(let i = 0; i < newExam.questionNo; i++)
          {
            newExam.questions.push(
              {
                question : 'what is rule of law',
                options : [
                  {optionText: 'Rule that guides people', isCorrect: false},
                  {optionText: 'Organization of people in the society ', isCorrect: false},
                  {optionText: 'Equality before the law', isCorrect: false},
                  {optionText: 'Rights of minority', isCorrect: false}
                ]
              }
              )
            }
            
          setExamsList([...examsList, newExam]);
          setShowAddDialouge(!showAddDialouge);
          
        }else{
          setqnoerr(true)
        }
      }
      
         
    }

    const handleDialouge = () =>{
      if(!selectedExam){
        setShowAddDialouge(!showAddDialouge)
        setExamName(null);
        setValue()
        
      }
    }

    const namecheck = (event) =>{
      setExamNameError(false);
      let counter = 0;
      examsList.map((exam) =>{
        event.target.value === exam.name? counter++ : counter+=0;
      })
      if (counter > 0)
      {
        setExamNameError(true);
      }else{
        setExamName(event.target.value);
      }
    }

    const handleRemove = (exam) =>{
      const index = examsList.indexOf(exam);
      var temp = [...examsList];
      const x = temp.splice(index, 1);
      setExamsList(temp);
      setDeleteExam(null);
    }
    
    const handlePublish = (exam) => {
      setExamsList((prevList) => {
        return prevList.map((item) => {
          if (item.name === exam.name) {
            return {
              ...item,
              public: !item.public
            };
          }
          return item;
        });
      });
    };

    const handleQnoInputChange = (event) => {
      setValue(event.target.value === '' ? '' : Number(event.target.value))
       
      
    };
  
    const handleBlur = () => {
      if (value < 0) {
        setValue(0);
      } else if (value > 100) {
        setValue(100);
      }
    };


    function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
    }

    const rows = [
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Omojola Iqmat', 80, 90, '11:40', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      createData('Odibo Peter', 35, 50, '11:30', '15 January'),
      
    ];

    const handleOptChange = (index, event) =>{
      const text = event.target.value;
      opValue[qIndex][index] = text;
    }
    const handleOptSelect = (event, index) =>{
      const SelectedBoolean = event.target.value;
      opSelectValue[qIndex][index] = SelectedBoolean;
      
    }

    const handlequestionChange = (event) =>{
      const text = event.target.value;
      qValue[qIndex] = text;
    }

    var handleNP = (operation) =>{
      if (operation === 'next') {
        
          qIndex < selectedExam.questions.length - 1? setQIndex(qIndex + 1) : setQIndex(qIndex)
          console.log(selectedExam.questions.length);
          console.log(opSelectValue[qIndex][1]);
        } 
      if (operation === 'previous') {
      
          qIndex > 0 ? setQIndex(qIndex - 1) : setQIndex(qIndex);
          
        } 
        

        
        
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
            <h1>{subject} {year} {term} term - {grade}</h1>
          </div>

          <div className="addExamButton">
            <Tooltip title="Add an exam" arrow>
          <Button variant="contained" startIcon={<AddBoxIcon/>} className={`dbutton ${selectedExam? 'disabled' : ''}`} onClick={handleDialouge}>
            EXAM
          </Button>
            </Tooltip>
          </div>

          <div className="examHistoryCon">
            <div className="examHistory">
              {(examsList.length !== 0 && !selectedExam && !showResult &&
                <div className="historyListCon">
                  {examsList.map((exam) =>(
                    <div className="historyList">
                      <div className="details">
                        <div className="publicIcon">
                          {exam.public? <Public/> : <PublicOff/>}
                        </div>
                        <h1>{exam.name}</h1>
                      </div>

                      <div className="icons">
                        <Tooltip title="Edit">
                        <Fab color="secondary" aria-label="edit" size='small'> 
                        <Edit onClick={() => setSelectedExam(exam)}/>
                        </Fab>
                        </Tooltip>

                        <Tooltip title="Delete">
                        <Fab color="secondary" aria-label="edit" size='small'>
                        <DeleteForever onClick={() => setDeleteExam(exam)}/>
                        </Fab>
                        </Tooltip>

                        <Tooltip title="Publish">
                          <Fab color="primary" aria-label="edit" size='small'>
                          <Publish onClick={() => handlePublish(exam)}/>
                          </Fab>
                        </Tooltip>

                        <Tooltip title="Results">
                          <Fab color="primary" aria-label="edit" size='small'>
                          <Article onClick={() => setShowResult(true)}/>
                          </Fab>
                        </Tooltip>
                      </div>
                     
                    </div>
                    
                  ))}
               </div>

                    


                )}

                {(examsList.length === 0 && !selectedExam && !showResult &&
                  <div className="unavailable">
                  <h1>No Exams Available</h1>
                  
                  </div>
                  )}

                 {(selectedExam && !showResult &&
                    <div className='editQuestions'>
                      {/* header section */}

                      <div className="header">
                      <h2>{qIndex + 1}/{selectedExam.questionNo}</h2>
                      <Tooltip title="Add an exam" arrow>
                        <Button variant="contained" startIcon={<Save/>} className={`dbutton ${selectedExam? 'disabled' : ''}`} onClick={() => setSelectedExam(null)}>
                          Save
                        </Button>
                        </Tooltip>
                      </div>

                      {/* question input section */}

                      <div className="qInput">
                      <TextField
                        id="standard-multiline-static"
                        label="Enter Question"
                        multiline
                        rows={2}
                        defaultValue={selectedExam.questions[qIndex].question}
                        value={qValue}
                        variant="standard"
                        onChange={handlequestionChange}
                        
                      />
                      </div>

                        {/* options section */}

                      <div className="optionSec">
                        <div className="optionList">
                        {selectedExam.questions[qIndex].options.map((option, index) =>(
                          <FormControl sx={{ m:1, minWidth: 120, display:'flex', gap: 1,}} size='small'>
                          <TextField id="outlined-basic" label="Option" variant="standard" multiline fullWidth defaultValue={option.optionText} value={opValue[qIndex][index]} onChange={(event) => handleOptChange(index, event)}/> 
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={opSelectValue[qIndex][index]}
                                label="isCorrect"
                                defaultValue={option.isCorrect}
                                onChange={(event)=>handleOptSelect(event,index)}
                                >
                                <MenuItem value={true}>true</MenuItem>
                                <MenuItem value={false}>false</MenuItem>

                              </Select>
                              </FormControl>
                                ))}
                             
                        </div>
                      </div>
                      

                      <div className="controllers">
                      <Button variant="contained" onClick={()=>handleNP('previous')}>
                          Previous
                        </Button>
                      <Button variant="contained" onClick={()=>handleNP('next')}>
                          Next
                        </Button>
                      </div>
                    </div>
                 )}
                  
                {(showResult &&
                  <div className="resultCon">
                    <ArrowBack onClick={()=> setShowResult(false)} sx={{cursor:'pointer'}}/>
                    <h2>20 students took your exam</h2>

                    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 300}}>
                      <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                          <TableRow>
                            <TableCell>Name Of Student</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Score&nbsp;(%)</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.calories}</TableCell>
                              <TableCell align="right">{row.fat}</TableCell>
                              <TableCell align="right">{row.carbs}</TableCell>
                              <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </Paper>
                    
                  </div>

                  )}
            </div>
          </div>

        </div>

        {/* Account Card Backdrop */}

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        
        <AccountCard/>

      </Backdrop>
        
      {/* Add exam dialogue box */}

      {showAddDialouge && (
        <Dialog disableEscapeKeyDown open={Boolean(showAddDialouge)} onClose={handleDialouge}>
        <DialogTitle>Add An Exam</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: '1.5rem'}}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              required
              error = {examNameError}
              id="filled-error-helper-text"
              label="Name"
              defaultValue=""
              helperText={`${examNameError? 'Name already exists' : 'enter any name (e.g exam1)'}`}
              variant="filled"
              onChange={namecheck}
            />
            </FormControl>

            <FormControl>
            <InputLabel id="qnumber">Number of questions</InputLabel>
            <Input
            value={value}
            error={qnoerr}
            size="small"
            id='qnumber'
            onChange={handleQnoInputChange}
            onBlur={handleBlur}
            
            
            inputProps={{
              step: 5,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />

            {(qnoerr && 
              <p>Amount of question should be 1 - 100</p>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialouge}>Cancel</Button>
          <Tooltip title="Clicking ok will add an exam draft where you can upload questions and publish" arrow>
          <Button onClick={handleAddExam}>Ok</Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
      )}

        {/* Delete Exam dialouge Box */}

        {deleteExam && (
          <Dialog
          open={deleteExam? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={()=> setSelectedExam(null)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`Are you sure you want to delete ${deleteExam.name}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Once deleted your uploaded questions and results in the particular exam will be permanently gone!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleRemove(deleteExam)}>Yes</Button>
            <Button onClick={()=> setDeleteExam(null)}>No</Button>
          </DialogActions>
        </Dialog>
        )}


      </div>
    </div>
    </div>
  )
}
