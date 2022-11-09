import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Feed } from './components/Feed';


const ProtectedRoute = (props) => {
  const token = localStorage.getItem('SHOPPING_TOKEN');
  if(token) return props.children;
  return <Navigate to='/login' />
}

const PublicRoute = (props) => {
  const token = localStorage.getItem('SHOPPING_TOKEN');
  if(token) return <Navigate to='/feed' />
  return props.children;
}

function App() {
  return (
    <div className="App">
      <h1>Shopping App</h1>
      <Routes>
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>
    </div>
  );
}

export default App;
