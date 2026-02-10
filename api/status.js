// Simple in-memory state (resets on cold start, but good enough for live performance)
// For production, you'd use a database or Redis

let state = {
  isRunning: false,
  isPaused: false,
  startedAt: null
};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    // Return current state
    return res.status(200).json(state);
  }
  
  if (req.method === 'POST') {
    // Update state (called by start/stop/pause endpoints)
    const { isRunning, isPaused } = req.body || {};
    
    if (typeof isRunning === 'boolean') {
      state.isRunning = isRunning;
      if (isRunning) state.startedAt = new Date().toISOString();
    }
    
    if (typeof isPaused === 'boolean') {
      state.isPaused = isPaused;
    }
    
    return res.status(200).json(state);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
};
