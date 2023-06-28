import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contex/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import React from 'react';

export const Userdata = () => {
    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(UserContext);
    const userDocRef = doc(db, "users", currentUser.uid);
    
    useEffect(() => {
        const getUserData = async () => {
            const userDoc = await getDoc(userDocRef);
            const data = userDoc.data();
            setUserData(data);
        };
        
        getUserData();
    }, [userDocRef]);
    
    return userData;
};