import React, { useContext, useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { UserContext } from './contex/UserContext';

export const TeacherSubject = () => {
  const { currentUser } = useContext(UserContext);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const subjectsRef = collection(db, "subjects");
    const q = query(subjectsRef, where("teacherID", "==", currentUser.uid));

    // Set up a real-time listener using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedSubjects = [];
      querySnapshot.forEach((doc) => {
        updatedSubjects.push(doc.id);
      });

      setSubjects(updatedSubjects);
      console.log("Subject fetched");
    });

    return () => {
      unsubscribe(); // Clean up the listener when the component unmounts
    };
  }, [currentUser.uid]);

  return subjects;
};
