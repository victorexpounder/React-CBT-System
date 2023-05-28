import React from 'react'
import "../SubjectWidget/SubWidget.scss";


export const LessSubjectWidget = () => {

    const subjectList = [
        'Biology',
        'Chemistry',
        'Mathematics'
    ]

  return (
    <div className="container">
      <h1>Your Subjects:</h1>
      <div className="widget-container">
        {subjectList.map((subject) => (
          <div
            key={subject}
            className={`Rwidget`}
            
          >
            <div className="Title">
              <h2>{subject}</h2>
            </div>
            
            </div>
        ))}
        </div>
    </div>

  )
}
