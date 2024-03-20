import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dress() {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('/get'); // Assuming proxy is set up for backend routes
        setDresses(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchDresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/delete/${id}`); // Assuming proxy is set up for backend routes
      setDresses(prevDresses => prevDresses.filter(dress => dress._id !== id));
    } catch (error) {
      console.log('Error deleting dress:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="content">
        <div className="header">
          <h1>Funny Fashion Vision </h1>
          <div className="auth-buttons">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
        <p>Find your choice here.</p>
        <Link to="/dressform">
          <button className="button-add-more">Add more</button>
        </Link>

        <div className="dress-container">
          {dresses && dresses.map((dress) => (
            <div key={dress._id} className="dress-card">
              <img src={dress.img} alt="" className="dress-image" />
              <div className="dress-info">
                <p>{dress.Entity}</p>
                <p>{dress.Property1}</p>
                <p>{dress.Property2}</p>
                <p>{dress.Property3}</p>
                <p>{dress.Rating}</p>
                <p>Created By: {dress.created_by}</p> {/* Display creator information */}
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
