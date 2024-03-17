import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
   
    console.log('Logging in with:', email, password);
    
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p> Dont have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;
