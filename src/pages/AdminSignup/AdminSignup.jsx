import React from 'react'
import { LoginSidebar } from '../../components/LoginSidebar/LoginSidebar'
import { SignupForm } from '../../components/SignupForm/SignupForm'
import './AdminSignup.scss'

export const AdminSignup = () => {
  return (
    <div className='AdminSignup'>
        <LoginSidebar />
        
        <SignupForm className='signupCon'/>
        
    </div>
  )
}
