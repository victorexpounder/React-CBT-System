import React from 'react'
import { LoginSidebar } from "../../components/LoginSidebar/LoginSidebar"
import { LoginForm } from "../../components/LoginForm/LoginForm"
import './AdminLogin.scss'
export const AdminLogin = () => {

  return (
    <div className='AdminLogin'>
        <LoginSidebar/>
        <div className="loginformcon">
        <LoginForm text={['Login To Admin Portal', 'Login to take exam?', '/Login', '/', 'Create Admin Account', '/AdminSignup']}/>
        </div>
    </div>
  )
}
