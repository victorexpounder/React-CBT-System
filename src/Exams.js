import { and, collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';

export const Exams = (published, session, term, grade, subject) => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
  const examsRef = collection(db, 'exams');

  const queryFilters = [
    where('session', '==', session),
    where('term', '==', term),
    where('subject', '==', subject),
    where('class', '==', grade),
  ];

  if (published) {
    queryFilters.push(where('public', '==', true));
  }

  const q = query(examsRef, ...queryFilters);

  

  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const examsData = [];
      querySnapshot.forEach((doc) => {
        const exam = doc.data(); // Call the function to get the actual data
        examsData.push(exam);
      });
      console.log("exams")
      setExams(examsData);
    });

    return () => {
      unsubscribe(); // Clean up the listener when the component unmounts
    };
  }, []);

  return exams;
};
