import { getSystemHealthService } from '../services/healthService.js';

// @desc    Get API Health, DB Status, and System Metrics
// @route   GET /api/health
// @access  Public
export const getHealth = (req, res) => {
  const healthData = getSystemHealthService();
  
  // Server-computed HTTP status code: 200 for healthy or degraded
  res.status(200).json({
    success: true,
    ...healthData,
  });
};
