import React, { useContext } from 'react'
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { UserContext } from './contex/UserContext';

export const TeacherSubject = async() => {
    const { currentUser } = useContext(UserContext);
    // Create a reference to the subjects collection in Firestore
    const subjectsRef = collection(db, "subjects");
    const q = query(subjectsRef, where("teacherID", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const subjects = [];

    querySnapshot.forEach((doc) => {
        const subject = doc.id;
        subjects.push(subject);
    })

  return subjects;
    
  
}
