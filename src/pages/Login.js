import React from 'react';
import '../App.css'; // Ensure the path is correct

function Login() {
  return (
    <div className="login-page-container dark-theme">
      <h1 className="login-heading">Welcome to TeamHub</h1>
      <p> </p>
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form>
          <input type="text" placeholder="Username" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="forgot-password-button">Forgot Password?</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
