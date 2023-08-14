import React, { useEffect, useState } from "react";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import "./Result.scss"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
const ResultComponent = ({ totalQuestions, selectedans, totalmarks, mark, subject, year, studentName, examID, term}) => {
  var correctCount = 0;
  var wrongCount = 0;
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadFailed, setUploadFailled] = useState(false);
  
  const calculateScore = () => {
    const score = (marksGained / totalmarks) * 100;
    return isNaN(score) ? 0 : score.toFixed(2);
  };

  
    for(let i = 0; i < selectedans.length; i++)
    {
        selectedans[i] ? correctCount++ : wrongCount++;
    }
    const marksGained = correctCount * mark;
   
    const uploadResult = async() =>{
      try{
        setUploading(true);
        // Create a user document in Firestore
        const examsDocRef = doc(db, `exams/${examID}/results`, studentName);
         await setDoc(examsDocRef, { correctCount, wrongCount, score : calculateScore(), totalmarks,timestamp: serverTimestamp()},);
        setUploading(false);
        setUploaded(true);
      }catch(error){
        setUploading(false);
        setUploadFailled(true);
        console.log(error);
      }
    }

    useEffect(()=>{
      uploadResult();
    }, [])

    

  return (
    <div className="result-component">
      <div className="details">
        <h1>{term} term {subject} {year}</h1>
        <h3>{studentName}</h3>
        </div>
      <div className="result-component__score">
        <p className={`${calculateScore() > 50? 'green': 'red'}`}>Score: {calculateScore()}%</p>
      </div>
      <div className="result-component__progress">
        <LinearProgress
          variant="determinate"
          value={calculateScore()}
          color={`${calculateScore() > 50? 'success': 'inherit'}`}
        />
      </div>
      <div className="result-component__answers">
        <p>
          Correct Answers: {correctCount} / {totalQuestions}
        </p>
        <p>Wrong Answers: {wrongCount} / {totalQuestions}</p>
        <p>Score: {marksGained} / {totalmarks}</p>
      </div>

          <Snackbar
          open={uploading}
          onClose={()=> setUploading(false)}
          message="Result Uploading... Please make sure result is uploaded before leaving"
          />

          <Snackbar
          open={uploaded}
          autoHideDuration={6000}
          onClose={()=> setUploaded(false)}
          > 
            <Alert onClose={()=> setUploaded(false)} severity="success" sx={{ width: '100%' }}>
            Result Uploaded Successfully!
            </Alert>
          </Snackbar>

          <Snackbar
          open={uploadFailed}
          autoHideDuration={6000}
          onClose={()=> setUploadFailled(false)}
          > 
            <Alert onClose={()=> setUploadFailled(false)} severity="error" sx={{ width: '100%' }}>
            Result Upload failed. Please alert your moderator
            </Alert>
          </Snackbar>
          
    </div>
  );
};

export default ResultComponent;
