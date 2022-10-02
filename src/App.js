import './App.css'
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/navbar/NavBar';
import HomePage from './components/homepage/HomePage';

function App() {
  return (
    <div className="main">
      <Router>
        <NavBar />
        <HomePage />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
