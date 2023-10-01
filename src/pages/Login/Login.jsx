import "./login.scss"
import { LoginSidebar } from "../../components/LoginSidebar/LoginSidebar"
import { LoginForm } from "../../components/LoginForm/LoginForm"
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"


export const Login = () => {
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(()=>{
    setOpenDialog(true);
  },[])

  return (
    <div className="login">
      <LoginSidebar/>
      <div className="loginformcon">
      <LoginForm  text={['Login To Take Exam', 'login as admin?', '/AdminLogin', '/exam']} />
      </div>

      <Dialog onClose={()=>setOpenDialog(false)} open={openDialog}>
      <DialogTitle>Welcome to BCBT demo</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
          This is version of the app is just for testing and showcase purposes.
          <br />
          Click on login as admin and use any of the following login details
          <br />
          Login as director: victordirector@gmail.com, password: 123456
          <br />
          Login as teacher: victorteacher@gmail.com, password: 123456
          </DialogContentText>
        </DialogContent>
      
    </Dialog>
    </div>
  )
}
