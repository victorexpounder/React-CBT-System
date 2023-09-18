import React from 'react'
import { ForgotPasswordForm } from '../../components/ForgotPassword/ForgotPasswordForm'
import { LoginSidebar } from '../../components/LoginSidebar/LoginSidebar'

export const ForgotLogin = () => {
    
  return (
    <div className="login">
      <LoginSidebar/>
      <div className="loginformcon">
      <ForgotPasswordForm/>
      </div>
    </div>
  )
}
