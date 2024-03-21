import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateDress() {
  const { id } = useParams();
  const [dress, setDress] = useState({
    Entity: '',
    Property1: '',
    Property2: '',
    Property3: '',
    Rating: '',
    img: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await axios.get(`https://s55-educate3.onrender.com/get/${id}`);
        setDress(response.data);
      } catch (error) {
        console.log('Error fetching dress:', error);
      }
    };

    fetchDress();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDress(prevDress => ({
      ...prevDress,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://s55-educate-3.onrender.com/update/${id}`, dress);
      navigate('/');
    } catch (error) {
      console.log('Error updating dress:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Update Dress</h2>
      <form onSubmit={handleSubmit} className='text' style={{ padding: '20px' }}>
        <label style={{ marginBottom: '10px' }}>
          Entity:
          <input type="text" name="Entity" value={dress.Entity} onChange={handleChange} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Property1:
          <input type="text" name="Property1" value={dress.Property1} onChange={handleChange} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Property2:
          <input type="text" name="Property2" value={dress.Property2} onChange={handleChange} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Property3:
          <input type="text" name="Property3" value={dress.Property3} onChange={handleChange} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Rating:
          <input type="text" name="Rating" value={dress.Rating} onChange={handleChange} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Image URL:
          <input type="text" name="img" value={dress.img} onChange={handleChange} />
        </label>
        <button className="loginbtn" type="submit">Update Dress</button>
      </form>
    </div>
  );
}

export default UpdateDress;
