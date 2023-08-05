import { useContext, useEffect, useState } from 'react'
import './LoginForm.scss'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { RemoveRedEye, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';


export const LoginForm = ({text}) => {
  
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the history object from react-router-dom
  const [Offline, setOffline] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNoauth, setShowNoauth] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
      function stillonline()
    {
        var x =  navigator.onLine;
            if (!x)
        {
            setOffline(true);
            
        }
    } 
    
    
    useEffect(() => {
      if (showNoauth) {
        const timer = setTimeout(() => {
          setShowNoauth(false);
        }, 6000);
    
        return () => clearTimeout(timer);
      }
    }, [showNoauth]);

  const handleLogout = () => {
    // Sign out the user from Firebase
    auth.signOut()
      .then(() => {
        // Remove the user from localStorage
        localStorage.removeItem("currentUser");
        localStorage.removeItem("subject");
        localStorage.removeItem("term");
        localStorage.removeItem("class");
        localStorage.removeItem("session");
        // Other logout logic
      })
      .catch((error) => {
        // Handle logout error
      });
  };
  
  useEffect(() => {
    handleLogout();
  }, []);

  

  const handleLogin = (e) => {
    e.preventDefault();
    stillonline();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        const userDocRef = doc(db, "users", uid);
        setLoading(false);
        const getUserDoc = async () => await getDoc(userDocRef);
        
        getUserDoc().then((userDoc) => {
          if(!userDoc.exists())
          {
            navigate('/selectExam')
          }else{
            if(text[0]!=='Login To Admin Portal'){
              setMessage('Seems you are trying to login in with an admin account, navigate to admin login page');
              setShowNoauth(true);
            }else{

              // Check if user is approved
              const isApproved = userDoc.data().approved;
              const isDirector = userDoc.data().role;
          
              if (!isApproved && isDirector !== "Director" ) {
                // User is not approved, redirect to pending approval page
                setMessage('You are not approved to access this system contact Director or principal');
                setShowNoauth(true);
                
              } else {
                navigate('/')
              }
            }
          }
          
        });
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        // Handle login error
      });
  };
  
  

  return (
    <div className='LoginForm'>
      <div className='logincon'>
      <h2>{text[0]}</h2>
        <form onSubmit={handleLogin}>
          <div className='inputDiv'>
        <input type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} />
          </div>
        <div className='inputDiv'>
        <input type={`${showPassword? '' : 'password'}`} placeholder="Enter Password" onChange={e=>setPassword(e.target.value)}></input> 
        <div className='eye' onClick={()=>setShowPassword(!showPassword)}>
        {showPassword? <VisibilityRounded /> : <VisibilityOffRounded/>}
        </div>
        </div>
        {error &&   Offline? <span>You are offline, Please connect to the internet to login</span> :error && <span>Wrong Email Or Password!</span>}
        
        <button type="submit">{loading? 'Logging You In...' : 'Login'}</button>
      </form>
      <p><a href={text[2]}>{text[1]}</a></p>
      <p><a href={text[5]}>{text[4]}</a></p>
      </div>
      

      <Snackbar open={showNoauth} autoHideDuration={6000} onClose={() => setShowNoauth(false)}>
        <Alert onClose={() => setShowNoauth(false)} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
