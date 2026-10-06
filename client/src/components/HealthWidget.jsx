import React, { useState, useEffect } from 'react';
import { Activity, Database, Server, Monitor, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import api from '../api/axios';

const HealthWidget = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [latency, setLatency] = useState(null);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    const start = performance.now();
    try {
      const res = await api.get('/health');
      const duration = Math.round(performance.now() - start);
      setLatency(duration);
      setData(res.data);
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      setLatency(duration);
      setError(err.response?.data?.message || err.message || 'Unable to reach backend server');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative top glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            padding: '10px',
            borderRadius: '12px',
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
          }}>
            <Activity size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>
              Server Architecture & Diagnostics Monitor
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
              {data?.message || 'Connecting to backend system services...'}
            </p>
          </div>
        </div>

        <button
          onClick={fetchHealth}
          disabled={loading}
          className="btn-secondary"
          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
        >
          <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          {loading ? 'Pinging Server...' : 'Ping /api/health'}
        </button>
      </div>

      {/* 3 Tier Status Grid - Populated Directly by Server Data */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        {/* Tier 1: Client */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              <Monitor size={16} color="#38bdf8" /> Client Presentation Tier
            </span>
            <span className="badge badge-success">
              <CheckCircle2 size={12} /> Render Active
            </span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>Thin Client View</div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 0 0' }}>Zero business logic • Pure presentation</p>
        </div>

        {/* Tier 2: Server */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              <Server size={16} color="#06b6d4" /> Server Logic Tier
            </span>
            {data ? (
              <span className={`badge ${data.status === 'HEALTHY' ? 'badge-success' : 'badge-warning'}`}>
                <CheckCircle2 size={12} /> {data.status}
              </span>
            ) : (
              <span className="badge badge-danger">
                <AlertTriangle size={12} /> Offline
              </span>
            )}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
            {data ? `${data.app}` : 'Node.js + Express'}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 0 0' }}>
            {data?.uptime?.formatted
              ? `Uptime: ${data.uptime.formatted} • Memory: ${data.system.memoryUsageMB}MB`
              : 'Waiting for server response'}
          </p>
        </div>

        {/* Tier 3: MongoDB */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              <Database size={16} color="#10b981" /> Database Tier
            </span>
            {data?.database?.connected ? (
              <span className="badge badge-success">
                <CheckCircle2 size={12} /> Connected
              </span>
            ) : (
              <span className="badge badge-warning">
                <AlertTriangle size={12} /> {data?.database?.status || 'Waiting'}
              </span>
            )}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
            {data?.database?.engine || 'MongoDB'}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 0 0' }}>
            {data?.database?.connected
              ? `DB: ${data.database.name || 'medinow'} (${data.database.host || 'Atlas'})`
              : 'Configured in server/.env (Atlas / Local)'}
          </p>
        </div>
      </div>

      {/* Raw Health Response Viewer */}
      <div style={{
        background: '#040711',
        borderRadius: '10px',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: '#38bdf8',
        maxHeight: '180px',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
          <span>SERVER HEALTH & DIAGNOSTIC PAYLOAD</span>
          <span>{latency !== null ? `Latency: ${latency}ms` : ''}</span>
        </div>
        {error ? (
          <div style={{ color: '#fb7185' }}>Error: {error}</div>
        ) : data ? (
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <div style={{ color: '#94a3b8' }}>Fetching from backend...</div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HealthWidget;
