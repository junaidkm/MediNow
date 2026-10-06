import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles, 
  Calendar, Video, FileText, ShieldCheck, ArrowRight 
} from 'lucide-react';
import api from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleQuickFill = (role) => {
    if (role === 'patient') {
      setFormData({
        email: 'alex.smith@medinow.demo',
        password: 'Password123!',
      });
    } else {
      setFormData({
        email: 'dr.clara.oswald@medinow.demo',
        password: 'Password123!',
      });
    }
  };

  // Zero business logic on client: all authentication rules executed on the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/auth/login', formData);
      setSuccess(response.data.message || 'Login successful!');
      if (response.data.data) {
        localStorage.setItem('medinow_user', JSON.stringify(response.data.data));
      }
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Server error occurred during authentication'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        {/* Left Side: Practo Healthcare Value Proposition */}
        <div className="auth-side-banner">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '1.25rem', fontWeight: 800, color: '#132c54', marginBottom: '1.5rem' }}>
              <span style={{ color: '#14bef0' }}>•</span>MediNow<span style={{ color: '#14bef0' }}>•</span>
            </div>
            
            <h2 className="auth-banner-title">Your Health, Connected.</h2>
            <p className="auth-banner-sub">
              Access trusted doctors, digital prescriptions, and online video consultations anytime.
            </p>

            <div className="auth-benefit-item">
              <div className="auth-benefit-icon">
                <Calendar size={18} />
              </div>
              <div className="auth-benefit-text">
                <strong>Instant Appointments:</strong> Confirmed clinic & hospital slots with zero waiting time.
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="auth-benefit-icon">
                <Video size={18} />
              </div>
              <div className="auth-benefit-text">
                <strong>24/7 Video Consultations:</strong> Connect with top certified specialists in under 60 seconds.
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="auth-benefit-icon">
                <FileText size={18} />
              </div>
              <div className="auth-benefit-text">
                <strong>Digital Health Records:</strong> 256-bit encrypted lab tests and doctor prescriptions.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#166534', fontWeight: 600, background: '#f0fdf4', padding: '8px 12px', borderRadius: '6px' }}>
            <ShieldCheck size={16} />
            <span>Trusted by 30M+ verified patients across India</span>
          </div>
        </div>

        {/* Right Side: Authentic Practo Login Form */}
        <div className="auth-form-side">
          {/* Tabs: Login | Register */}
          <div className="auth-tabs">
            <button type="button" className="auth-tab-btn active">
              Login
            </button>
            <Link to="/register" className="auth-tab-btn">
              Register
            </Link>
          </div>

          {/* Quick Demo Fill Pills for Testing */}
          <div className="auth-quick-fill-box">
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={13} color="#14bef0" /> 1-CLICK DEMO ACCOUNTS:
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleQuickFill('patient')}
                className="practo-login-btn"
                style={{ fontSize: '0.75rem', padding: '4px 8px', flex: 1, textAlign: 'center' }}
              >
                Demo Patient
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('doctor')}
                className="practo-login-btn"
                style={{ fontSize: '0.75rem', padding: '4px 8px', flex: 1, textAlign: 'center' }}
              >
                Demo Doctor
              </button>
            </div>
          </div>

          {/* Server-returned error message */}
          {error && (
            <div className="auth-alert-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Server-returned success message */}
          {success && (
            <div className="auth-alert-success">
              <CheckCircle2 size={16} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="login-email">Mobile Number / Email ID</label>
              <div className="auth-field-wrapper">
                <input
                  id="login-email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Mobile number or Email"
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="auth-label" htmlFor="login-password" style={{ margin: 0 }}>Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.78rem', color: '#14bef0', fontWeight: 600 }}>
                  Forgot password?
                </a>
              </div>
              <div className="auth-field-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="auth-input"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    color: '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#14bef0', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: '0.82rem', color: '#4b5563', cursor: 'pointer' }}>
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? 'Authenticating on Server...' : 'Login'}
            </button>
          </form>

          <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '1.5rem', textAlign: 'center', lineHeight: 1.4 }}>
            By continuing, you agree to MediNow's{' '}
            <a href="#terms" style={{ color: '#14bef0' }}>Terms & Conditions</a> and{' '}
            <a href="#privacy" style={{ color: '#14bef0' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
