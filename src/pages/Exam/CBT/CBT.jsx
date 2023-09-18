// CBTComponent.js

import React, { useState } from 'react';
import './CBT.scss';
import CalculatorComponent from '../../../components/Calculator/Calculator';
import CalculateIcon from '@mui/icons-material/Calculate';
import ResultComponent from '../../../components/Result/Result';
import { useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const CBTComponent = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [exam, setExam] = useState();
    const term = 'First'
    const subject = 'Economics'
    const year = '2022/2023'
    const totalmarks = exam?.questionNo;
    const mark = 1;
    const [allocatedTimeSeconds, setAllocatedTimeSeconds] = useState();
    const [questions, setQuestions] = useState([
     
    ]);

    const examID = JSON.parse(localStorage.getItem("exam"));
    const fetchExams = async() =>{
      try{
        const examsRef = doc(db, "exams", examID);
        const examDoc = await getDoc(examsRef);
        const data = examDoc.data();
        
        setExam(data);
        // Shuffle the order of questions
        const shuffledQuestions = shuffleArray(data.questions);
        setQuestions(shuffledQuestions);

        console.log(shuffledQuestions);
        
      }catch(error){
        console.log(error);
      }
    }

    const fetchDuration = async() =>{
      try{
        const examsRef = doc(db, "exams", examID);
        const examDoc = await getDoc(examsRef);
        const data = examDoc.data();
        setAllocatedTimeSeconds(data.duration);
      }catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchExams();
      fetchDuration();
    },[])

    function shuffleArray(array) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
    

    const studentName = JSON.parse(localStorage.getItem("studentName"));
    const [selectedOptions, setSelectedOptions] = useState(Array(questions?.length).fill(null)); // Array to keep track of selected options for each question
    const [showCalculator, setShowCalculator] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [SelectedAnswers, setSelectedAnswers] = useState(Array(questions?.length).fill(null));
    const [timeElapsed, setTimeElapsed] = useState(0); // State variable to keep track of time elapsed
    // Set allocated time in hours
    const allocatedTimeHours = allocatedTimeSeconds / 3600;
    
    const handleOptionSelect = (option) => {
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[currentQuestion] = option.optionText;
      setSelectedOptions(updatedSelectedOptions);
      const UpdateSelectedAnswers = [...SelectedAnswers];
      UpdateSelectedAnswers[currentQuestion] = option.isCorrect;
      setSelectedAnswers(UpdateSelectedAnswers);
    };
    
  
    const handleNextQuestion = () => {
      if (currentQuestion < questions.length - 1){
          setCurrentQuestion(currentQuestion + 1);
      }
      
    };
  
    const handlePreviousQuestion = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    };
    const handleCalculatorToggle = () => {
      // Toggle calculator visibility
      setShowCalculator(!showCalculator);
    };
  
    const handleCalculatorResult = (result) => {
      // Update selected answer with calculator result
      setSelectedOptions(result.toString());
      // Hide calculator
      setShowCalculator(false);
    };
     
    const handleSubmit = () =>{
      setShowResult(true);
    }

    useEffect(() => {
      // Convert allocated time to seconds
      const allocatedTime = allocatedTimeHours * 3600;
      let timer = null;
  
      // Function to update time elapsed and call handleSubmit when allocated time elapses
      const updateTimer = () => {
        setTimeElapsed((prevTime) => prevTime + 1);
  
        if (timeElapsed >= allocatedTime) {
          handleSubmit();
          clearInterval(timer);
        }
      };
  
      // Start timer
      timer = setInterval(updateTimer, 1000);
  
      // Clean up timer when component unmounts
      return () => {
        clearInterval(timer);
      };
    }, [timeElapsed]);

     // Convert timeElapsed back to hours, minutes, and seconds for displaying remaining time
      const remainingTimeHours = Math.max(0, (allocatedTimeHours * 3600 - timeElapsed) / 3600);
      const remainingTimeMinutes = Math.max(0, ((allocatedTimeHours * 3600 - timeElapsed) % 3600) / 60);
      const remainingTimeSeconds = Math.max(0, (allocatedTimeHours * 3600 - timeElapsed) % 60);

      const handleBeforeUnload = (event) => {
        if (!showResult) {
          event.preventDefault(
            alert('Are you sure you want to leave, you havent submitted yet')
          );
          
          
        }
      };

            // Effect to add event listener for beforeunload event
        useEffect(() => {
          window.addEventListener('beforeunload', handleBeforeUnload);

          // Clean up event listener when component unmounts
          return () => {
            window.addEventListener('beforeunload', handleBeforeUnload);
          };
        }, []);

        const handleTabVisibilityChange = () => {
          if (document.hidden) {
            handleSubmit();
            // Perform actions when the user leaves the tab
          } else {
            console.log("User returned to the tab");
            // Perform actions when the user comes back to the tab
          }
        };
      
        useEffect(() => {
          document.addEventListener("visibilitychange", handleTabVisibilityChange);
      
          return () => {
            document.removeEventListener("visibilitychange", handleTabVisibilityChange);
          };
        }, []);
  
    return (
      <div className="genCon">

        {!showResult && (
          <div className="cbt-container">
              <div className="calculator">
            {showCalculator && (
            <CalculatorComponent
              onResult={handleCalculatorResult}
              onClose={handleCalculatorToggle}
            />
          )}
        </div>

              <div className="calculator-button-container">
              <button className="calculator-button" onClick={handleCalculatorToggle}>
              <CalculateIcon fontSize='large'/>
              </button>
            </div>

            <div className="submit-button-container">
              <button className='submit' onClick={handleSubmit}>
                Submit
              </button>
            </div>

          <h1 className='heading'>{exam?.term} Term {exam?.subject} Examination {exam?.session}</h1>
        <div className="question-container">
          <h2 className='questionCount'>{currentQuestion + 1}/{questions?.length}</h2>
          <h1 className="question">{questions[currentQuestion]?.question}</h1>
          <ul className="options">
            {questions[currentQuestion]?.options.map((option, index) => (
              <li
                key={index}
                className={`option ${selectedOptions[currentQuestion] === option.optionText ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option.optionText}
              </li>
            ))}
          </ul>
          <div className="button-container">
            <button className="previous-button" onClick={handlePreviousQuestion}>
              Previous
            </button>
            <button className="next-button" onClick={handleNextQuestion}>
              Next
            </button>
          </div>

        </div>
        <div className="timer">
        {/* Display remaining time */}
        <p className={`${remainingTimeHours < 1 && remainingTimeMinutes < 1 ? 'colouredtime' : ''}`}>Time Remaining:  <h1> {Math.floor(remainingTimeHours)} : {Math.floor(remainingTimeMinutes)} : {Math.floor(remainingTimeSeconds)} </h1> </p>
        </div>
          </div>
          )}
        
        {showResult && (
            <div className="cbt-container">
              <div className="question-container">
                <ResultComponent totalQuestions={questions.length}  selectedans={SelectedAnswers} totalmarks={totalmarks} mark={mark} subject={exam.subject} year={exam.session} studentName={studentName} examID={examID} term={exam.term}/>
              </div>
            </div>

        )}
        
      </div>
    );
  };
  

export default CBTComponent;