import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password.length < 6) {
                setSignupError("Password should be more than 5 characters");
                return;
            }
            const response = await axios.post(`https://s55-educate-4.onrender.com/signup`, { username, password }); // Assuming your backend is running on localhost:3000
            if (response.status === 201) {
                sessionStorage.setItem('login', true);
                sessionStorage.setItem('signupSuccess', 'Signup successful');
                console.log(response.data); 
            } else {
                setSignupError('Signup failed');
            }
        } catch (err) {
            console.error(err);
            setSignupError('An error occurred during the signup');
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Username:</label>
                    <input
                        type="text"
                        id="name"
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
                {signupError && <p>{signupError}</p>}
                <button type="submit">Sign Up</button>

            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Signup;
