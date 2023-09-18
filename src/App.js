import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { AdminLogin } from "./pages/AdimLogin/AdminLogin";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Children, useContext, useEffect, useState } from "react";
import { UserContext } from "./contex/UserContext";
import { AdminSignup } from "./pages/AdminSignup/AdminSignup";
import CBTComponent from "./pages/Exam/CBT/CBT";
import { List } from "./pages/List/List";
import { Subject } from "./pages/Subject/Subject";
import { ProfilePage } from "./pages/Profile/Profile";
import { YearPage } from "./pages/AdminExam/YearPage/YearPage";
import { ClassPage } from "./pages/AdminExam/ClassPage/ClassPage";
import { AdminSubjectSelect } from "./pages/AdminExam/AdminSubjectSelect/AdminSubjectSelect";
import { SubjectSingle } from "./pages/AdminExam/SubjectSinglePage/SubjectSingle";
import { TermPage } from "./pages/AdminExam/TermPage/TermPage";
import { SelectExam } from "./pages/Exam/SelectExam/SelectExam";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { ForgotLogin } from "./pages/ForgotLogin/ForgotLogin";





function App() {
  const { currentUser } = useContext(UserContext);
  
  const RequireAuth = ({ children }) => {

    if (currentUser) {
      return children; // Render the protected routes
    } else {
      return <Navigate to="/login" />; // Navigate to login page if not approved
    }
  };

  


  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/">
              <Route path="login" element={<Login/>} />
              <Route path="Adminlogin" element={<AdminLogin/>} />
              <Route path="AdminSignup" element={<AdminSignup/>} />
              <Route path="ResetPassword" element={<ForgotLogin/>} />
              <Route path="selectExam" element={<RequireAuth><SelectExam/></RequireAuth>} />
              <Route index element={<RequireAuth><Home/></RequireAuth>} />
              <Route path="teachers" element={<RequireAuth><List/></RequireAuth>} />
              <Route path="subjects" element={<RequireAuth><Subject/></RequireAuth>} />
              <Route path="profile" element={<RequireAuth><ProfilePage/></RequireAuth>} />
              <Route path="exams/">
                <Route index element={<RequireAuth><YearPage/></RequireAuth>} />
                <Route path="class/">
                  <Route index element={<RequireAuth><ClassPage/></RequireAuth>} />
                  <Route path="term/">
                      <Route index element={<RequireAuth><TermPage/></RequireAuth>}/>
                      <Route path="subjects/">
                        <Route index element={<RequireAuth><AdminSubjectSelect/></RequireAuth>} />
                        <Route path="subjectpage" element={<RequireAuth><SubjectSingle/></RequireAuth>} />
                      </Route>
                  </Route>
                  </Route>
              </Route>
              

              <Route  path="cbt" element={<RequireAuth><CBTComponent/></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
