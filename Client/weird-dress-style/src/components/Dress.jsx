import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dress() {
  const [dresses, setDresses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('https://s55-educate-3.onrender.com/get');
        setDresses(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchDresses();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://s55-educate-3.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://s55-educate-3.onrender.com/delete/${id}`);
      setDresses(prevDresses => prevDresses.filter(dress => dress._id !== id));
    } catch (error) {
      console.log('Error deleting dress:', error);
    }
  };

  const handleUserChange = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div>
      <div className="content">
        <div className="header">
          <h1>Funny Fashion Vision</h1>
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
        <div>
          <select value={selectedUser} onChange={(e) => handleUserChange(e.target.value)}>
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        <div className="dress-container">
          {dresses && dresses
            .filter(dress => !selectedUser || dress.created_by === selectedUser)
            .map((dress) => (
              <div key={dress._id} className="dress-card">
                <img src={dress.img} alt="" className="dress-image" />
                <div className="dress-info">
                  <p>{dress.Entity}</p>
                  <p>{dress.Property1}</p>
                  <p>{dress.Property2}</p>
                  <p>{dress.Property3}</p>
                  <p>{dress.Rating}</p>
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
