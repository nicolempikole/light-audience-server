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

app.post("/start", (req, res) => {
  pusher.trigger("strobe_channel", "START", {});
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
