const PAGE_ACCESS_TOKEN = "ЧИНИЙ_TOKEN";

app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        if (event.message) {
          const sender = event.sender.id;

          await fetch(
            `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                recipient: { id: sender },
                message: { text: "Сайн байна! MPM chatbot ажиллаж байна 🚀" }
              })
            }
          );
        }
      }
    }
  }

  res.sendStatus(200);
});
