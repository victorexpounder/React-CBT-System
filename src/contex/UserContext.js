import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Import your Firebase authentication module


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState(JSON.parse(storedUser) || null);

  useEffect(() => {
    // Check if there's a stored user in localStorage
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser)); // Update the currentUser state with the stored user
    }

    // Add an event listener to Firebase auth to listen for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If a user is authenticated, store it in localStorage and update the currentUser state
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
      } else {
        // If a user is not authenticated, remove it from localStorage and set currentUser to null
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe(); // Cleanup the event listener when the component unmounts
    };
  }, []);

  const clearCurrentUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };


  return (
    <UserContext.Provider value={{ currentUser, clearCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};