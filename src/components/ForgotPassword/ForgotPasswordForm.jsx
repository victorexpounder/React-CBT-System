import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { Alert, Snackbar } from '@mui/material';

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    // Function to send a password reset email
const handlePasswordReset = async (email) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setSuccess(true);
      console.log('Password reset email sent successfully.');
      // Display a message to the user indicating that the password reset email has been sent.
    } catch (error) {
      setLoading(false);
      setFailed(true);
      console.error('Error sending password reset email:', error.message);
      // Display an error message to the user.
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePasswordReset(email);
  };

  return (
    <div className='LoginForm'>
      <div className='logincon'>
      <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputDiv'>
            <input type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} />
          </div>
        <button type="submit">{loading? 'Sending Reset Link...' : 'Send Reset Link'}</button>
      </form>
      </div>

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Password Reset Link sent to your email, check inbox
        </Alert>
      </Snackbar>

      <Snackbar open={failed} autoHideDuration={6000} onClose={() => setFailed(false)}>
        <Alert onClose={() => setFailed(false)} severity="error" sx={{ width: '100%' }}>
          Failed to send Password Reset Link, Try Again
        </Alert>
      </Snackbar>
      </div>
  )
}
