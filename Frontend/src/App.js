// import './App.css';
// import SingUP from './components/SingUp';
import AppRoutes from './components/routes'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <h3>{"Goal & Habit Tracker Module"}</h3>
      <AppRoutes />
    </>

  );
}

export default App;
