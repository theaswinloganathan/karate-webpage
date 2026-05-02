import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port === '5173') ? 'http://localhost:5000' : '';

const Login = () => {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    console.log('Attempting login to:', `${API_URL}/api/login`, { username: cleanUsername });
    try {
      const res = await axios.post(`${API_URL}/api/login`, { username: cleanUsername, password: cleanPassword });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      if (res.data.role === 'master') {
        navigate('/master');
      } else {
        navigate('/student');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="section bg-black" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="bg-dark p-4 border-radius-8 login-card" style={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1rem', left: 0, transform: 'none' }}>
            <span className="text-red">Portal</span> Login
          </h2>
          <p className="text-gray" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign in to your academy dashboard</p>
          
          <div className="flex gap-2" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              className={`btn w-100 ${role === 'student' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setRole('student')}
              type="button"
            >
              Student
            </button>
            <button 
              className={`btn w-100 ${role === 'master' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setRole('master')}
              type="button"
            >
              Master
            </button>
          </div>

          {error && <div style={{ color: 'var(--color-red)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login to Dashboard</button>
          </form>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/" className="text-gold" style={{ fontSize: '0.9rem' }}>← Back to Website</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
