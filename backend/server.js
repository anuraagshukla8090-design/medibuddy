const express = require("express");
const axios = require("axios");
const cors = require("cors");



const app = express();

app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/predict/heart",
      req.body
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});


app.listen(5000, () => {
  console.log("Node backend running on port 5000");
});
