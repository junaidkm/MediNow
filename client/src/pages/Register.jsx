import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AlertCircle, CheckCircle2, Calendar, Video, FileText, 
  ShieldCheck, HeartHandshake, Stethoscope 
} from 'lucide-react';
import api from '../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'patient',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorList, setErrorList] = useState([]);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) {
      setError(null);
      setErrorList([]);
    }
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  // Pure presentation dispatch: all validation and business rules are executed by the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorList([]);
    setSuccess(null);

    try {
      const response = await api.post('/auth/register', formData);
      setSuccess(response.data.message || 'Registration successful!');
      if (response.data.data) {
        localStorage.setItem('medinow_user', JSON.stringify(response.data.data));
      }
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Server error occurred during registration';
      const serverErrors = err.response?.data?.errors || [];
      setError(serverMessage);
      setErrorList(serverErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        {/* Left Side: Healthcare Value Proposition */}
        <div className="auth-side-banner">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '1.25rem', fontWeight: 800, color: '#132c54', marginBottom: '1.5rem' }}>
              <span style={{ color: '#14bef0' }}>•</span>MediNow<span style={{ color: '#14bef0' }}>•</span>
            </div>
            
            <h2 className="auth-banner-title">Join India's Top Medical Platform.</h2>
            <p className="auth-banner-sub">
              Create your account as a patient or practitioner to access unified healthcare records.
            </p>

            <div className="auth-benefit-item">
              <div className="auth-benefit-icon">
                <Calendar size={18} />
              </div>
              <div className="auth-benefit-text">
                <strong>Easy Booking:</strong> Save family members and schedule tests & consultations in 1-click.
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="auth-benefit-icon">
                <Video size={18} />
              </div>
              <div className="auth-benefit-text">
                <strong>Instant Specialists:</strong> Direct video link with verified physicians across 100+ specialties.
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="auth-benefit-icon">
                <FileText size={18} />
              </div>
              <div className="auth-benefit-text">
                <strong>Prescription Sync:</strong> Automatic digital prescription delivery straight to your device.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#166534', fontWeight: 600, background: '#f0fdf4', padding: '8px 12px', borderRadius: '6px' }}>
            <ShieldCheck size={16} />
            <span>100% HIPAA Aligned & Data Protected</span>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="auth-form-side">
          {/* Tabs: Login | Register */}
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab-btn">
              Login
            </Link>
            <button type="button" className="auth-tab-btn active">
              Register
            </button>
          </div>

          {/* Role Toggle Selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '1.5rem',
            padding: '4px',
            background: '#f1f5f9',
            borderRadius: '6px',
          }}>
            <button
              type="button"
              onClick={() => handleRoleSelect('patient')}
              style={{
                padding: '6px',
                borderRadius: '4px',
                background: formData.role === 'patient' ? '#ffffff' : 'transparent',
                boxShadow: formData.role === 'patient' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                color: formData.role === 'patient' ? '#132c54' : '#64748b',
                fontWeight: 700,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <HeartHandshake size={15} /> Patient
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('doctor')}
              style={{
                padding: '6px',
                borderRadius: '4px',
                background: formData.role === 'doctor' ? '#ffffff' : 'transparent',
                boxShadow: formData.role === 'doctor' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                color: formData.role === 'doctor' ? '#132c54' : '#64748b',
                fontWeight: 700,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Stethoscope size={15} /> Doctor
            </button>
          </div>

          {/* Server-returned error message */}
          {error && (
            <div className="auth-alert-error">
              <AlertCircle size={16} />
              <div>
                <div>{error}</div>
                {errorList.length > 0 && (
                  <ul style={{ margin: '4px 0 0 12px', padding: 0 }}>
                    {errorList.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
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
              <label className="auth-label" htmlFor="reg-name">Full Name</label>
              <div className="auth-field-wrapper">
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={formData.role === 'doctor' ? 'Dr. Sarah Connor' : 'Jane Doe'}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="reg-email">Email ID</label>
              <div className="auth-field-wrapper">
                <input
                  id="reg-email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="reg-phone">Mobile Number</label>
              <div className="auth-field-wrapper">
                <input
                  id="reg-phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="reg-password">Password</label>
              <div className="auth-field-wrapper">
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="auth-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? 'Creating Account on Server...' : `Register as ${formData.role === 'doctor' ? 'Doctor' : 'Patient'}`}
            </button>
          </form>

          <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '1.25rem', textAlign: 'center', lineHeight: 1.4 }}>
            By registering, you agree to MediNow's{' '}
            <a href="#terms" style={{ color: '#14bef0' }}>Terms & Conditions</a> and{' '}
            <a href="#privacy" style={{ color: '#14bef0' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
