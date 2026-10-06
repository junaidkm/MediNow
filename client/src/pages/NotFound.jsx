import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: 'rgba(244, 63, 94, 0.12)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fb7185',
        marginBottom: '1.5rem',
      }}>
        <HelpCircle size={32} />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>404 - Page Not Found</h1>
      <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto 2rem auto' }}>
        The requested medical resource or view doesn't exist on MediNow.
      </p>
      <Link to="/" className="btn-primary">
        <ArrowLeft size={16} /> Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
