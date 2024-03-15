import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Update Dress</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Entity:
          <input type="text" name="Entity" value={dress.Entity} onChange={handleChange} />
        </label>
        <label>
          Property1:
          <input type="text" name="Property1" value={dress.Property1} onChange={handleChange} />
        </label>
        <label>
          Property2:
          <input type="text" name="Property2" value={dress.Property2} onChange={handleChange} />
        </label>
        <label>
          Property3:
          <input type="text" name="Property3" value={dress.Property3} onChange={handleChange} />
        </label>
        <label>
          Rating:
          <input type="text" name="Rating" value={dress.Rating} onChange={handleChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="img" value={dress.img} onChange={handleChange} />
        </label>
        <button type="submit">Update Dress</button>
      </form>
    </div>
  );
}

export default UpdateDress;
