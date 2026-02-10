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
    await pusher.trigger("strobe_channel", "STOP", {});
    res.status(200).json({ status: "ok", message: "Performance stopped" });
  } catch (error) {
    console.error("Pusher error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
