const express = require("express");
const Pusher = require("pusher");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: "2101293",
  key: "30c6a2b5192e79fdcbdc",
  secret: "f4f812bfc35c4ecc1b64",
  cluster: "eu",
  useTLS: true
});

// Start performance endpoint
app.post("/start", (req, res) => {
  console.log("Starting performance...");
  pusher.trigger("strobe_channel", "START", {})
    .then(() => {
      res.json({ status: "ok", message: "Performance started" });
    })
    .catch(err => {
      console.error("Pusher error:", err);
      res.status(500).json({ status: "error", message: err.message });
    });
});

// Stop performance endpoint
app.post("/stop", (req, res) => {
  console.log("Stopping performance...");
  pusher.trigger("strobe_channel", "STOP", {})
    .then(() => {
      res.json({ status: "ok", message: "Performance stopped" });
    })
    .catch(err => {
      console.error("Pusher error:", err);
      res.status(500).json({ status: "error", message: err.message });
    });
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "running",
    message: "Light Audience Server",
    endpoints: ["/start", "/stop"]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
