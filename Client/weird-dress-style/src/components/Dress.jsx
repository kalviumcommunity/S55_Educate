import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dress() {
  const [dresses, setDresses] = useState([]);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get'); // Adjust the URL as per your backend
        setDresses(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchDresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`); // Adjust the URL as per your backend
      setDresses(prevDresses => prevDresses.filter(dress => dress._id !== id));
    } catch (error) {
      console.log('Error deleting dress:', error);
    }
  };

  return (
    <div>
      <div className="content">
        <h1>Welcome to WiFa</h1>
        <p>Find your choice here.</p>
        <Link to="/dressform">
          <button>Find here</button>
        </Link>
        <div className="dress-container">
          {dresses && dresses.map((dress) => (
            <div key={dress._id} className="dress-card">
              <img src={dress.img} alt="" className="dress-image" />
              <div className="dress-info">
                <p>Entity: {dress.Entity}</p>
                <p>Property1: {dress.Property1}</p>
                <p>Property2: {dress.Property2}</p>
                <p>Property3: {dress.Property3}</p>
                <p>Rating: {dress.Rating}</p>
                <button onClick={() => handleDelete(dress._id)}>Delete</button>
                <Link to={`/updatedress/${dress._id}`}>
                  <button>Update</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dress;
