import React from "react";
import { LinearProgress } from "@mui/material";
import "./Result.scss"
const ResultComponent = ({ totalQuestions, selectedans, totalmarks, mark, subject, year, sudentName}) => {
  var correctCount = 0;
  var wrongCount = 0;
  const calculateScore = () => {
    const score = (marksGained / totalmarks) * 100;
    return isNaN(score) ? 0 : score.toFixed(2);
  };

  
    for(let i = 0; i < selectedans.length; i++)
    {
        selectedans[i] ? correctCount++ : wrongCount++;
    }
    const marksGained = correctCount * mark;
   

  return (
    <div className="result-component">
      <div className="details">
        <h1>{subject} {year}</h1>
        <h3>{sudentName}</h3>
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
    </div>
  );
};

export default ResultComponent;
