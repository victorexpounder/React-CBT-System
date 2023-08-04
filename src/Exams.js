import { and, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { db } from './firebase';

export const Exams = async(published,session,term,grade,subject) => {
    const examsRef = collection(db, "exams");
    const q = query(examsRef, 
      where("public", "==", true),
      where("session", "==", session),
      where("term", "==", term),
      where("subject", "==", subject),
      where("class", "==", grade),
      )
    const q2 = query(examsRef, 
      where("session", "==", session),
      where("term", "==", term),
      where("subject", "==", subject),
      where("class", "==", grade),
      )
    const querySnapshot = published? await getDocs(q) : await getDocs(q2);
    const exams = [];

    querySnapshot.forEach((doc) => {
      const exam = doc.data(); // Call the function to get the actual data
      exams.push(exam);
    });

    return exams;
}
