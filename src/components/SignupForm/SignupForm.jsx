import React from 'react'
import './SignupForm.scss'
import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SelectAutoWidth from '../Selection/SimpleSelect';
import MultipleSelect from '../Selection/multipleSelect';
import { db } from '../../firebase';
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { collection, addDoc, setDoc, doc} from "firebase/firestore"; 
import { Alert, Snackbar } from '@mui/material';

export const SignupForm = () => {
    const [error, setError] = useState(false);
    const [fullname, setfullname] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [role, setRole] = React.useState('');
    const [subjects, setSubjects] = React.useState([""]);
    const approved = false;
    const [Offline, setOffline] = useState(false) ;
    const [openSuccess, setOpenSuccess] = useState(false) ;
    const [loading, setLoading] = useState(false);
      function stillonline()
    {
        var x =  navigator.onLine;
            if (!x)
        {
            setOffline(true);
            
        }
    } 
    
    const handleSignup = (e) =>{

          e.preventDefault();
          stillonline();
          setLoading(true);

          createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User sign-up or sign-in successful
            const user = userCredential.user;
            setOpenSuccess(true);

            const uid = userCredential.user.uid;
            const timestamp = serverTimestamp(); // Get the server timestamp
            
            // Create a user document in Firestore
            const userDocRef = doc(db, 'users', uid);
             setDoc(userDocRef, { fullname, role, subjects, approved,created_at: timestamp, email},);
            setLoading(false)
            
        })
        .catch((error) => {
            // User sign-up or sign-in failed
            setError(true);
            setLoading(false);
            // Handle the error appropriately
        });
    }
    console.log(subjects);
  return (
    <div className='SignupForm'>
        <div className='logincon'>
      <h2>Create Admin Account</h2>
        <form onSubmit={handleSignup}>
        <input type="text" placeholder="Enter Fullname" onChange={e=>setfullname(e.target.value)} />
        <input type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} />
        <SelectAutoWidth role={role} setRole={setRole} />
        
        {error &&  Offline? <span>You are Offline signUp needs internet connection</span> : error && <span>Error in creating account</span>}
        <button type="submit">{loading? 'Signing You Up...' : 'SignUp'}</button>
      </form>
      <p><a href='/AdminLogin'>Login to admin portal</a></p>


      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Account Created Succesfully!!
        </Alert>
      </Snackbar>
      </div>
      
    </div>
  )
}
