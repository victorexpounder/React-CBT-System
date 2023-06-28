//code
import React, { useEffect, useState } from 'react'
import { SideBar } from '../../../components/SideBar/SideBar'
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, Input, InputLabel, MenuItem, Paper, Select, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip} from '@mui/material'
import { ArrowBack, Article, DeleteForever, Edit, Label, Menu, Padding, Public, PublicOff, Publish, Save } from "@mui/icons-material";
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

  //setting selected exam to dummy so we dont get undefined error at the start
  const [selectedExam, setSelectedExam] = useState(
    {
      name: 'exam',
      public: false,
      questionNo : 10,
      questions : [
        {
          question : 'what is rule of law',
          options : [
            {optionText: '', isCorrect: false},
            {optionText: '', isCorrect: false},
            {optionText: '', isCorrect: false},
            {optionText: 'Rights of minority', isCorrect: false}
          ]
        }
      ]
    }
  );
  const [examOpen, setExamOpen] = useState(false)
  const [deleteExam, setDeleteExam] = useState(null);
  const [showAddDialouge, setShowAddDialouge] = useState(false);
  const [examName, setExamName] = useState(null);
  const [examNameError, setExamNameError] = useState(false);
  const [value, setValue] = useState();
  const [qnoerr, setqnoerr] = useState(false);
  const [opValue, setOpValue] = useState(() => {
    const initialArray = [];
    for (let i = 0; i < selectedExam.questions.length; i++) {
      initialArray.push([
        selectedExam.questions[i].options[0].optionText,
        selectedExam.questions[i].options[1].optionText,
        selectedExam.questions[i].options[2].optionText,
        selectedExam.questions[i].options[3].optionText,
      ]);
    }
    return initialArray;
  });

  //setting the two dimensional array for each question with four options
  const [opSelectValue, setOpselectValue] = useState(() => {
    const initialArray = [];
    for (let i = 0; i < selectedExam.questions.length; i++) {
      initialArray.push([
        selectedExam.questions[i].options[0].isCorrect,
        selectedExam.questions[i].options[1].isCorrect,
        selectedExam.questions[i].options[2].isCorrect,
        selectedExam.questions[i].options[3].isCorrect,
       ]);
    }
    
    
    return initialArray;
  });

  const [qValue, setQvalue] = useState(() =>{
    const initialArray = [];
    for (let i = 0; i < selectedExam.questions.length; i++) {
      initialArray.push(
        selectedExam.questions[i].question,
       )
    }
    return initialArray;
  }
  );

 //using useEffect to redeclare the two dimensional array ans setting it to setOpselect each time selectedExam changes
  useEffect(() => {
    const initialArray = [];
    const initialArrayValue = [];
    const initialArrayQuestion = [];

    for (let i = 0; i < selectedExam.questions.length; i++) {
      initialArray.push([
        selectedExam.questions[i].options[0].isCorrect,
        selectedExam.questions[i].options[1].isCorrect,
        selectedExam.questions[i].options[2].isCorrect,
        selectedExam.questions[i].options[3].isCorrect,
      ]);

      initialArrayValue.push([
        selectedExam.questions[i].options[0].optionText,
        selectedExam.questions[i].options[1].optionText,
        selectedExam.questions[i].options[2].optionText,
        selectedExam.questions[i].options[3].optionText,
      ]);

      initialArrayQuestion.push(
        selectedExam.questions[i].question
      )

    }
    setOpselectValue(initialArray);
    setOpValue(initialArrayValue);
    setQvalue(initialArrayQuestion);
  }, [selectedExam]);


  const [qIndex, setQIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [duration, setDuration] = useState(0)
  


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
      if(!examOpen){
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
      // Create a copy of the state array
      const updatedArray = [...opValue];
      
      // Modify the value in the copied array
      updatedArray[qIndex][index] = text;
      
      // Update the state with the modified array
      setOpValue(updatedArray);
    }
    const handleOptSelect = (event, index) =>{
      const SelectedBoolean = event.target.value;
  
      // Create a copy of the state array
      const updatedArray = [...opSelectValue];
      
      // Modify the value in the copied array
      updatedArray[qIndex][index] = SelectedBoolean;
      
      // Update the state with the modified array
      setOpselectValue(updatedArray);
      
    }

    const handlequestionChange = (event) =>{
      const text = event.target.value;
      const updatedArray = [...qValue];
      updatedArray[qIndex] = text
      setQvalue(updatedArray);
    }

    var handleNP = (operation) =>{
      if (operation === 'next') {
        
          qIndex < selectedExam.questions.length - 1? setQIndex(qIndex + 1) : setQIndex(qIndex)
          
        } 
      if (operation === 'previous') {
      
          qIndex > 0 ? setQIndex(qIndex - 1) : setQIndex(qIndex);
          
        } 
        
    }

   const handleExamSelect = () =>{
      
      
      setExamOpen(true)
      console.log(selectedExam);
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
          <Button variant="contained" startIcon={<AddBoxIcon/>} className={`dbutton ${examOpen? 'disabled' : ''}`} onClick={handleDialouge}>
            EXAM
          </Button>
            </Tooltip>
          </div>

          <div className="examHistoryCon">
            <div className="examHistory">
              {(examsList.length !== 0 && !examOpen && !showResult &&
                <div className="historyListCon">
                  {examsList.map((exam) =>(
                    <div className="historyList" onClick={()=> setSelectedExam(exam)}>
                      <div className="details">
                        <div className="publicIcon">
                          {exam.public? <Public/> : <PublicOff/>}
                        </div>
                        <h1>{exam.name}</h1>
                      </div>

                      <div className="icons">
                        <Tooltip title="Edit">
                        <Fab color="secondary" aria-label="edit" size='small'> 
                        <Edit onClick={() => handleExamSelect(exam)}/>
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

                {(examsList.length === 0 && !examOpen && !showResult &&
                  <div className="unavailable">
                  <h1>No Exams Available</h1>
                  
                  </div>
                  )}

                 {(examOpen && !showResult &&
                    <div className='editQuestions'>
                      {/* header section */}

                      <div className="header">
                      <ArrowBack onClick={()=> setExamOpen(false)} sx={{cursor:'pointer'}}/>
                      <h2>{qIndex + 1}/{selectedExam.questionNo}</h2>
                      <Tooltip title="Add an exam" arrow>
                        <Button variant="contained" startIcon={<Save/>} className={`dbutton ${selectedExam? 'disabled' : ''}`} onClick={() => setExamOpen(false)}>
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
                        value={qValue[qIndex]}
                        variant="standard"
                        onChange={handlequestionChange}
                        
                      />
                      </div>

                        {/* options section */}

                      <div className="optionSec">
                        <div className="optionList">
                        {selectedExam.questions[qIndex].options.map((option, index) =>(
                          <FormControl sx={{ m:1, minWidth: 120, display:'flex', gap: 1,}} size='small'>
                          <TextField id="outlined-basic" label="Option" variant="standard" multiline fullWidth  value={opValue[qIndex][index]} onChange={(event) => handleOptChange(index, event)}/> 
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={opSelectValue[qIndex][index]}
                                label="isCorrect"
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

              <label htmlFor="select">Enter duration</label>
            <select value={duration} name='select' style={{padding: 10, border: 'none',  borderBottom: '1px solid #888'}} onChange={(e)=> setDuration(e.target.value)}>
              <option value={1800}>30 mins</option>
              <option value={3600} selected>1 hr</option>
              <option value={5400}>1hr 30mins</option>
              <option value={7200}>2hrs </option>
              <option value={9000}>2hrs 30mins</option>
              <option value={10800}>3hrs </option>
              <option value={12600}>3hrs 30mins</option>
              <option value={14400}>4hrs </option>
            </select>

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
          onClose={()=> setDeleteExam(null)}
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
