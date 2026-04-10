const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "mpm2026"; // Meta дээр хийсэн verify token
const PAGE_ACCESS_TOKEN = "ЭНД ӨӨРИЙН TOKEN ОРУУЛ";

/**
 * ROOT TEST
 */
app.get("/", (req, res) => {
  res.send("MPM BOT WORKING 🚀");
});

/**
 * WEBHOOK VERIFY (Meta шалгадаг)
 */
app.get("/webhook", (req, res) => {
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

/**
 * RECEIVE MESSAGE
 */
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach((entry) => {
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

/**
 * HANDLE MESSAGE
 */
function handleMessage(sender_psid, received_message) {
  let response;

  if (received_message.text) {
    response = {
      text: `Сайн байна 👋\nТа: "${received_message.text}" гэж бичлээ`,
    };
  }

  callSendAPI(sender_psid, response);
}

/**
 * SEND MESSAGE BACK
 */
async function callSendAPI(sender_psid, response) {
  await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: { id: sender_psid },
        message: response,
      }),
    }
  );
}

/**
 * START SERVER
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER RUNNING 🚀");
});
