import express from "express";

const app = express();
app.use(express.json());

// ✅ WEBHOOK VERIFY (Meta-д зориулсан)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "mpm2026";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// тест
app.get("/", (req, res) => {
  res.send("Server ажиллаж байна");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
