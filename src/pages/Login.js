import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import userApi from '../apis/services/userApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userApi.getUserProfile();
        if (response?.data) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await userApi.signInUser({ email: username, password });
      setIsLoggedIn(true); // ✅ instantly update navbar
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data.message);
      } else {
        console.error('Error during login:', error.message);
      }
    }
  };

  return (
    <div className="login-page-container dark-theme">
      <h1 className="login-heading">Welcome to TeamHub</h1>
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="forgot-password-button">Forgot Password?</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
