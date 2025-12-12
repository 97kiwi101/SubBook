import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

function Register({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    jobTitle: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await registerUser(formData);
      
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));
      setUser(data.user);
    

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
        <div className="login-box" style={{ width: '400px' }}>
          <h2 style={{ marginTop: 0 }}>Register</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" name="name" 
                value={formData.name} onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" name="email" 
                value={formData.email} onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" name="password" 
                value={formData.password} onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Job Title (Optional)</label>
              <input 
                type="text" name="jobTitle" 
                placeholder="e.g. Front Desk"
                value={formData.jobTitle} onChange={handleChange} 
              />
            </div>

            <button type="submit" className="btn-login">Create Account</button>
          </form>

          <div style={{ marginTop: '15px', fontSize: '12px', textAlign: 'center' }}>
            <Link to="/">Already have an account? Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;