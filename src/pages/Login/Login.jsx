import "./login.scss"
import { LoginSidebar } from "../../components/LoginSidebar/LoginSidebar"
import { LoginForm } from "../../components/LoginForm/LoginForm"


export const Login = () => {


  return (
    <div className="login">
      <LoginSidebar/>
      <div className="loginformcon">
      <LoginForm  text={['Login To Take Exam', 'login as admin?', '/AdminLogin', '/exam']} />
      </div>
    </div>
  )
}
