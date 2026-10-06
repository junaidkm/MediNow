import React, { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import api from '../api/axios';

const Home = () => {
  const [location, setLocation] = useState('Kozhikode');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  // Fetch catalog data from backend server (all data managed by server)
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [servRes, specRes] = await Promise.all([
          api.get('/catalog/services'),
          api.get('/catalog/specialties'),
        ]);
        setServices(servRes.data.data || []);
        setSpecialties(specRes.data.data || []);
      } catch (err) {
        console.error('Failed to load catalog data from server', err);
      }
    };
    fetchCatalog();
  }, []);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* 1. Dual Location & Doctor Search Bar */}
      <div className="practo-search-container">
        <div className="practo-search-location">
          <MapPin size={16} color="#4b5563" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="practo-location-select"
            placeholder="Select Location"
          />
        </div>

        <div className="practo-search-input-box">
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors, clinics, hospitals, etc."
            className="practo-search-input"
          />
        </div>
      </div>

      {/* 2. Four Prominent Category Cards (Identical to Screenshot) */}
      <div className="practo-cards-grid">
        {services.map((item) => (
          <div key={item.id} className="practo-card-item">
            <div
              className="practo-card-image-wrapper"
              style={{ backgroundColor: item.bgColor }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="practo-card-img"
              />
            </div>
            <div className="practo-card-text">
              <h3 className="practo-card-title">{item.title}</h3>
              <p className="practo-card-subtitle">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. "Consult top doctors online for any health concern" Section */}
      <section style={{ marginTop: '2rem' }}>
        <div className="practo-section-header">
          <div>
            <h2 className="practo-heading-main">
              Consult top doctors online for any health concern
            </h2>
            <p className="practo-heading-sub">
              Private online consultations with verified doctors in all specialists
            </p>
          </div>
          <button className="practo-view-all-btn">
            View All Specialities
          </button>
        </div>

        {/* Circular Specialties Row */}
        <div className="practo-specialties-row">
          {specialties.map((item) => (
            <div key={item.id} className="practo-specialty-circle-card">
              <div className="practo-circle-avatar">
                <img
                  src={item.iconUrl}
                  alt={item.name}
                  onError={(e) => {
                    // Clean medical SVG fallback if external icon is offline
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '🩺';
                  }}
                />
              </div>
              <h4 className="practo-specialty-name">{item.name}</h4>
              <span className="practo-consult-action">Consult Now →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
