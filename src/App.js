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
import { Children, useContext } from "react";
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




function App() {
  const { currentUser } = useContext(UserContext);
  const RequireAuth = ({children})=>{
    return currentUser ? children : <Navigate to="/login" />
  }

  
  console.log(currentUser);
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/">
              <Route path="login" element={<Login/>} />
              <Route path="Adminlogin" element={<AdminLogin/>} />
              <Route path="AdminSignup" element={<AdminSignup/>} />
              <Route index element={<Home/>} />
              <Route path="teachers" element={<List/>} />
              <Route path="subjects" element={<Subject/>} />
              <Route path="profile" element={<ProfilePage/>} />
              <Route path="exams/">
                <Route index element={<YearPage/>} />
                <Route path="class/">
                  <Route index element={<ClassPage/>} />
                  <Route path="term/">
                      <Route index element={<TermPage/>}/>
                      <Route path="subjects/">
                        <Route index element={<AdminSubjectSelect/>} />
                        <Route path="subjectpage" element={<SubjectSingle/>} />
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
