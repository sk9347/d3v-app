// Signup component
import './cssFile/signup.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginav=useNavigate()
  const handleSignup = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', { username, password });
      console.log('Signup successful:', response.data);
      setUsername('');
      setPassword('');
      alert('signup succusfull')
      loginav('/login')
    } catch (error) {
      setError('Signup failed');
    }
  };
  const handlelogin=()=>{
    loginav('/login')
  }

  return (
    <div className='sign-main'>
      <div className='sign-form'>
      <h1 style={{color:'rgb(8, 14, 85)'}}>D3V Technology Solutions</h1>
      <h1>Signup</h1>
      {error && <p style={{color:'red'}}>{error}</p>}
      <label>username</label><br/>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <label>password</label><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handlelogin}>Login</button>
      
      </div>
    </div>
  );
};

export default Signup;



