import { useState } from 'react';
// FIX: Add 'Link' to this import
import { useNavigate, Link } from 'react-router-dom'; 
import { loginUser } from '../api/auth';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = await loginUser({ email, password });
      
      // 1. Save to session
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));
      
      // 2. Update State
      // This will trigger App.jsx to re-render.
      // App.jsx will see "user" exists and automatically switch to the Dashboard.
      setUser(data.user);
      
      // REMOVED: navigate('/dashboard'); <--- This was causing the conflict!

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <header>
        <div className="header-logo">
          <h2>SubBook</h2>
        </div>
      </header>
      <div className="login-container">
        <div className="login-box">
          <h2 style={{ marginTop: 0 }}>Log in</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-login">Log in</button>
            
            {/* This is the part that was causing the error */}
            <div style={{ marginTop: '15px', fontSize: '12px', textAlign: 'center' }}>
                <Link to="/register">Need an account? Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;