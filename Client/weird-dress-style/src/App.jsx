import './App.css';
import Dress from './components/Dress.jsx';
import { Routes, Route } from 'react-router-dom';
import DressForm from './components/DressForm.jsx';
import UpdateDress from './components/UpdateDress.jsx'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dress />} />
        <Route path="/dressform" element={<DressForm />} />
        <Route path="/updatedress/:id" element={<UpdateDress />} /> 
      </Routes>
    </>
  );
}

export default App;
