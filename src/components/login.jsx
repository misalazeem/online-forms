import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const { setIsAuthenticated, setUserId } = useAuth();  
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);

    // Make the HTTP POST request to the backend for login
    axios.post('https://online-forms-backend.onrender.com/login', formData)
      .then((response) => {
        console.log('Login successful!', response.data);
        setIsAuthenticated(true);
        setUserId(response.data.user_id); // Store the user_id in the front-end state
        navigate('/create-form');
      })
      .catch((error) => {
        console.error('Login error:', error.response.data);
        // Show an error message to the user if login fails
        setError('Invalid email or password');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if error is not empty */}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button className='login-button' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
