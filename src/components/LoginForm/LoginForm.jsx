import { useContext, useState } from 'react'
import './LoginForm.scss'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';


export const LoginForm = ({text}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the history object from react-router-dom
  const [Offline, setOffline] = useState(false) ;
      function stillonline()
    {
        var x =  navigator.onLine;
            if (!x)
        {
            setOffline(true);
            
        }
    } 
    
    
    

  const handleLogout = () => {
    // Sign out the user from Firebase
    auth.signOut()
      .then(() => {
        // Remove the user from localStorage
        localStorage.removeItem("currentUser");
        // Other logout logic
      })
      .catch((error) => {
        // Handle logout error
      });
  };

  handleLogout();

  const handleLogin = (e) => {
    e.preventDefault();
    stillonline();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        const getUserDoc = async () => await getDoc(userDocRef);
        getUserDoc().then((userDoc) => {
          if(!userDocRef.exist)
          {
            navigate('/cbt')
          }
          // Check if user is approved
          const isApproved = userDoc.data().approved;
          const isDirector = userDoc.data().role;
          if (!isApproved && isDirector != "Director") {
            // User is not approved, redirect to pending approval page
            alert("You are not approved to access this page");
          } else {
            navigate(text[3]);
          }
        });
      })
      .catch((error) => {
        setError(true);
        // Handle login error
      });
  };
  
  return (
    <div className='LoginForm'>
      <div className='logincon'>
      <h2>{text[0]}</h2>
        <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} />
        {error &&   Offline? <span>You are offline, Please connect to the internet to login</span> :error && <span>Wrong Email Or Password!</span>}
        
        <button type="submit">Login</button>
      </form>
      <p><a href={text[2]}>{text[1]}</a></p>
      <p><a href={text[5]}>{text[4]}</a></p>
      </div>
      
    </div>
  )
}
