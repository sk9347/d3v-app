// Login component
import './cssFile/login.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert("login succesfull")
      navigate('/');
      window.location.reload()
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  const signupnav=useNavigate()
  const handsign=()=>{
      signupnav('/signup')
  }

  return (
    <div className='main'>
      
      <div className='form'>
      <h1 style={{color:'rgb(8, 14, 85)'}}>D3V Technology Solutions</h1>
      <h1>Login</h1>
      {error && <p style={{color:'red'}}>{error}</p>}
      <label>username</label><br/>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <label>password</label><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handsign}>Signup</button>
      </div>
    </div>
  );
};

export default Login;


