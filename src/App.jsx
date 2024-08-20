import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Header from "./Components/Header"
import LoginPage from "./Components/LoginPage"
import AdminPage from "./Components/AdminPage"
function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="Home" element={<Header/>} />
            <Route path="LoginPage" element={<LoginPage/>} />
            <Route path="AdminPage" element={<AdminPage/>} />
            </Routes>
    </Router>
  );
}

export default App;
