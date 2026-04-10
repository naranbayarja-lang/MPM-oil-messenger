const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ⚠️ ЭНД ШИНЭ PAGE TOKEN-ОО ТАВЬ
const PAGE_ACCESS_TOKEN = "ЭНД_ӨӨРИЙН_TOKEN";

// test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// webhook verify
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "mpm2026";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// webhook receive message
app.post("/webhook", async (req, res) => {
  console.log("Incoming:", JSON.stringify(req.body, null, 2));

  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      const event = entry.messaging[0];
      const sender = event.sender.id;

      if (event.message) {
        await sendMessage(sender, "Сайн байна! 👋");
      }
    }

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// send message function
async function sendMessage(sender_psid, text) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recipient: { id: sender_psid },
          message: { text }
        })
      }
    );

    const data = await response.json();
    console.log("Message sent:", data);
  } catch (error) {
    console.error("Send error:", error);
  }
}

// ⚠️ ЧУХАЛ (Render дээр)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER STARTED 🚀 on port " + PORT);
});
