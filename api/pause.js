const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2101293",
  key: "30c6a2b5192e79fdcbdc",
  secret: "f4f812bfc35c4ecc1b64",
  cluster: "eu",
  useTLS: true
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Trigger pause event to all connected clients
    await pusher.trigger("strobe_channel", "PAUSE", {});
    
    // Update state
    await fetch('https://light-audience-server.vercel.app/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPaused: true })
    });
    
    res.status(200).json({ status: "ok", message: "Performance paused" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
