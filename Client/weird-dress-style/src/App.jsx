import './App.css'
import Dress from './components/Dress.jsx'
import { Routes, Route } from 'react-router-dom';
import DressForm from './components/DressForm.jsx'

function App() {
  

  return (
    <>  
  
           <Routes>
          <Route path="/" element={<Dress />} />
          <Route path="/dressform" element={<DressForm/>} />
           </Routes>  
      
    </>
  )
}

export default App
