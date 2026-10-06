import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid #e5e9f2',
      background: '#ffffff',
      padding: '2.5rem 0',
      color: '#6b7280',
      fontSize: '0.85rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid #f0f2f5',
          marginBottom: '1.5rem',
        }}>
          <div>
            <h4 style={{ color: '#132c54', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>MediNow</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <a href="#about" style={{ color: '#6b7280' }}>About Us</a>
              <a href="#careers" style={{ color: '#6b7280' }}>Careers</a>
              <a href="#press" style={{ color: '#6b7280' }}>Press & Media</a>
              <a href="#contact" style={{ color: '#6b7280' }}>Contact Us</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#132c54', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>For Patients</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <a href="#search" style={{ color: '#6b7280' }}>Search Doctors</a>
              <a href="#search" style={{ color: '#6b7280' }}>Search Clinics</a>
              <a href="#search" style={{ color: '#6b7280' }}>Book Tele-Consultation</a>
              <a href="#search" style={{ color: '#6b7280' }}>Read Health Articles</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#132c54', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>For Doctors</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <a href="#profile" style={{ color: '#6b7280' }}>MediNow Profile</a>
              <a href="#clinic" style={{ color: '#6b7280' }}>Ray by MediNow</a>
              <a href="#reach" style={{ color: '#6b7280' }}>Practitioner Reach</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#132c54', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>More</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <a href="#help" style={{ color: '#6b7280' }}>Help & Support</a>
              <a href="#privacy" style={{ color: '#6b7280' }}>Privacy Policy</a>
              <a href="#terms" style={{ color: '#6b7280' }}>Terms & Conditions</a>
              <a href="#healthcare" style={{ color: '#6b7280' }}>Healthcare Directory</a>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
        }}>
          <div>
            © 2026 MediNow Healthcare. All rights reserved. Built with full-stack MERN architecture.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 600 }}>
            <ShieldCheck size={16} /> 100% HIPAA & Medical Compliance
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
