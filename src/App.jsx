import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import DriverRegistration from "./Components/DriverRegistration"
function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="Home" element={<DriverRegistration/>} />
            </Routes>
    </Router>
  );
}

export default App;
