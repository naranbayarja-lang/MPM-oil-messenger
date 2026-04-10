import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MPM chatbot ажиллаж байна 🚀");
});

app.listen(3000, () => {
  console.log("Server started");
});
