import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dress() {
  const [dresses, setDresses] = useState([]);
  const [selectedUser, setSelectedUser] = useState('All');
  const [uniqueUsers, setUniqueUsers] = useState(['All']);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('https://s55-educate-3.onrender.com/get');
        setDresses(response.data);
        
        const users = ["All", ...new Set(response.data.map(dress => dress.created_by).filter(Boolean))];
        setUniqueUsers(users);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchDresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://s55-educate-3.onrender.com/delete/${id}`);
      setDresses(prevDresses => prevDresses.filter(dress => dress._id !== id));
    } catch (error) {
      console.log('Error deleting dress:', error);
    }
  };

  const filteredDressesByUser = dresses.filter(
    dress => selectedUser === 'All' || dress.created_by === selectedUser
  );

  return (
    <div>
      <div className="content">
        <div className="header">
          <h1>
            Fully Fooly Fashion
            <div className="button-group">
              <div className="auth-buttons">
                <Link to="/login" className="auth-link">
                  <button><b>Login</b></button>
                </Link>
                <Link to="/signup" className="auth-link">
                  <button><b>Sign Up</b></button>
                </Link>
              </div>
              <div className="add-more-dropdown">
                <Link to="/dressform">
                  <button className="button-add-more"><b>Add more</b></button>
                </Link>
                {uniqueUsers.length > 1 && (
                  <div className="dropdown-container">
                    <select
                      onChange={(e) => setSelectedUser(e.target.value)}
                      value={selectedUser}
                      className="dropdown"
                    >
                      {uniqueUsers.map((user) => (
                        <option key={user} value={user}>
                          {user}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </h1>
        </div>

        <div className="dress-container">
          {filteredDressesByUser.map((dress) => (
            <div key={dress._id} className="dress-card">
              <img src={dress.img} alt="" className="dress-image" />
              <div className="dress-info" style={{ color: 'white' }}>
                <p>{dress.Entity}</p>
                <p>{dress.Property1}</p>
                <p>{dress.Property2}</p>
                <p>{dress.Property3}</p>
                <p>{dress.Rating}</p>
                <div className="button-group">
                  <button onClick={() => handleDelete(dress._id)}>Delete</button>
                  <Link to={`/updatedress/${dress._id}`}>
                  <button style={{ backgroundColor: '#085450' }}>
                    Update</button>
                 </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dress;
