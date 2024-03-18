import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/login', { username, password });
      
      if (response.status === 200) {
        console.log('Login successful');
        sessionStorage.setItem('loggedIn', true); 
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');
      
      if (response.status === 200) {
        console.log('Logout successful');
        sessionStorage.removeItem('loggedIn'); 
        window.location.href = '/login'; 
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p>{loginError}</p>}
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button> {/* Added logout button */}
      <p> Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;
