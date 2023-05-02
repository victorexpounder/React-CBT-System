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
              
              <Route  path="cbt" element={<RequireAuth><CBTComponent/></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
