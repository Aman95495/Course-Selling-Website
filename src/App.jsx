import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";

import Appbar from "./Appbar";
import User_Signin from "./User_Signin";
import User_Signup from "./User_Signup";
import AddCourses from './AddCourses';
import Admin_Signup from './Admin_Signup';
import Admin_Signin from './Admin_Signin';
import HomePage from './HomePage';
import CoursePage from './CoursePage';

function App() {
  return (
    <div style={{
        width: '100vw',
        height: '100vh',
    }}>
        <Appbar></Appbar>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/addcourses" element={<AddCourses/>}></Route>
                <Route path="/courses" element={<CoursePage/>}></Route>
                <Route path='/user_signin' element= {<User_Signin />}></Route>
                <Route path='/user_signup' element={<User_Signup />}></Route>
                <Route path='/admin_signup' element={<Admin_Signup />}></Route>
                <Route path='/admin_signin' element={<Admin_Signin />}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
