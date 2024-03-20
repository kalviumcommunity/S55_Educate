import './App.css';
import Dress from './components/Dress.jsx';
import UpdateDress from './components/UpdateDress.jsx';
import DressForm from './components/DressForm.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx'; 
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Dress />} />
        <Route path="/dressform" element={<DressForm />} />
        <Route path="/updatedress/:id" element={<UpdateDress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>  
    </>
  );
}

export default App;