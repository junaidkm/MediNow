import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="practo-header">
      <div className="container">
        <div className="practo-header-inner">
          {/* Left: Brand Logo & Main Nav */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="practo-brand-logo">
              <span className="dot">•</span>MediNow<span className="dot">•</span>
            </Link>

            <nav className="practo-nav-left">
              <Link to="/" className="practo-nav-link">
                Find Doctors
              </Link>
              <Link to="/" className="practo-nav-link">
                Video Consult
              </Link>
              <Link to="/" className="practo-nav-link">
                Lab Tests
              </Link>
              <Link to="/" className="practo-nav-link">
                Surgeries
              </Link>
            </nav>
          </div>

          {/* Right: Dropdowns & Login/Signup */}
          <div className="practo-nav-right">
            <div className="practo-dropdown-item">
              <span className="practo-corp-badge">NEW</span>
              <span>For Corporates</span>
              <ChevronDown size={14} color="#6b7280" />
            </div>

            <div className="practo-dropdown-item">
              <span>For Providers</span>
              <ChevronDown size={14} color="#6b7280" />
            </div>

            <div className="practo-dropdown-item">
              <span>Security & help</span>
              <ChevronDown size={14} color="#6b7280" />
            </div>

            <Link to="/login" className="practo-login-btn">
              Login / Signup
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
