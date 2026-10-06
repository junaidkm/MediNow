import { getDBStatus } from '../config/db.js';

/**
 * Server Business Logic for Health & Diagnostics
 * Centralizes all status calculations and metrics on the server.
 */

export const getSystemHealthService = () => {
  const dbStatus = getDBStatus();
  const uptimeSeconds = Math.floor(process.uptime());
  
  // Format uptime into human-readable string
  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
    if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
    return `${remainingSeconds}s`;
  };

  // Determine overall health status strictly on backend
  const isDbConnected = dbStatus.stateCode === 1;
  const overallStatus = isDbConnected ? 'HEALTHY' : 'DEGRADED';
  const statusMessage = isDbConnected
    ? 'All MediNow core services and database connections are operational'
    : 'MediNow API server is online; database connection is pending or disconnected';

  return {
    status: overallStatus,
    message: statusMessage,
    app: 'MediNow Healthcare Platform',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: {
      rawSeconds: uptimeSeconds,
      formatted: formatUptime(uptimeSeconds),
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    },
    database: {
      connected: isDbConnected,
      status: dbStatus.status,
      stateCode: dbStatus.stateCode,
      host: dbStatus.host,
      name: dbStatus.name,
      engine: 'MongoDB Atlas / Local',
    },
  };
};
