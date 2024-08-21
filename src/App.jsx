import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm'
import LoginPage from "./Components/LoginPage"
import AdminPage from "./Components/AdminPage"
import LoginAuth from './Components/LoginAuth';
import DriverRegistration from './Components/DriverRegistration';
function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="Home" element={<DriverRegistration/>} />
            <Route path="LoginPage" element={<LoginPage/>} />
            <Route path="AdminPage" element={<AdminPage/>} />
            <Route path="LoginAuth" element={<LoginAuth/>} />
            </Routes>
    </Router>
  );
}

export default App;
