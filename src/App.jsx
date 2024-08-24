import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm'
import AdminPage from "./Components/AdminPage"
import LoginAuth from './Components/LoginAuth';
import DriverRegistration from './Components/DriverRegistration';
import AdminSignin from './Components/AdminSignin';
import LoginPage from './Components/LoginPage';
function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="/LoginPage" element={<LoginPage/>} />
            <Route path="Home" element={<DriverRegistration/>} />
            <Route path="AdminPage" element={<AdminPage/>} />
            <Route path="LoginAuth" element={<LoginAuth/>} />
            <Route path="Admin" element={<AdminSignin/>} />
            </Routes>
    </Router>
  );
}

export default App;
