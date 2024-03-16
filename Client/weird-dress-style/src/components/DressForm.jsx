import { useState } from 'react';
import axios from 'axios';
import './EntityForm.css';
import { useNavigate } from 'react-router-dom';

function DressForm({ onNewDress }) {
  const [formData, setFormData] = useState({
    Entity: '',
    Property1: '',
    Property2: '',
    Property3: '',
    Rating: 0,
    img: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://s55-educate-3.onrender.com/add', formData);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log('Error adding dress:', error);
    }
  };

  return (
    <div>
      <h1>Dress Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Entity" placeholder="Entity" value={formData.Entity} onChange={handleChange} />
        <input type="text" name="Property1" placeholder="Property1" value={formData.Property1} onChange={handleChange} />
        <input type="text" name="Property2" placeholder="Property2" value={formData.Property2} onChange={handleChange} />
        <input type="text" name="Property3" placeholder="Property3" value={formData.Property3} onChange={handleChange} />
        <input type="number" name="Rating" placeholder="Rating" value={formData.Rating} onChange={handleChange} />
        <input type="text" name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DressForm;
