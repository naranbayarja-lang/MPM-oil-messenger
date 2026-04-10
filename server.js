const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN = "ЭНД ТОКЕНОО ОРУУЛ";

/* ================= WEBHOOK VERIFY ================= */
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

/* ================= RECEIVE MESSAGE ================= */
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach(entry => {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

/* ================= HANDLE MESSAGE ================= */
function handleMessage(sender_psid, received_message) {
  let text = received_message.text?.toLowerCase();
  let response;

  if (!text) {
    response = { text: "Зөвхөн текст ойлгоно 😅" };
  }

  else if (text.includes("hi") || text.includes("сайн")) {
    response = {
      text: "Сайн байна уу 👋\n1. Бүтээгдэхүүн\n2. Үнэ\n3. Зөвлөгөө\n4. Холбоо барих"
    };
  }

  else if (text.includes("1")) {
    response = {
      text: "🔹 Engine oil\n🔹 Motorcycle oil\n🔹 Gear oil"
    };
  }

  else if (text.includes("4") || text.includes("холбоо")) {
    response = {
      text: `📍 32-ын тойрог
📞 88255030

📍 Офицер
📞 80745030

📍 Цогтцэций
📞 80755030`
    };
  }

  else {
    response = { text: "Таны бичсэн: " + text };
  }

  callSendAPI(sender_psid, response);
}

/* ================= SEND MESSAGE ================= */
function callSendAPI(sender_psid, response) {
  fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: sender_psid },
      message: response
    })
  });
}

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running 🚀");
});
