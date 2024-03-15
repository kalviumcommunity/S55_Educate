import './App.css'
import Dress from './components/Dress.jsx'
import UpdateDress from './components/UpdateDress.jsx' // Import UpdateDress component
import { Routes, Route } from 'react-router-dom';
import DressForm from './components/DressForm.jsx'

function App() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Dress />} />
        <Route path="/dressform" element={<DressForm/>} />
        <Route path="/updatedress/:id" element={<UpdateDress />} />
 {/* Pass id as a prop */}
      </Routes>  
    </>
  )
}

export default App;
