const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = 5000;

// Enable CORS for frontend (adjust IP if needed)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.38.20:3000"], // Local and LAN access
    credentials: true,
  })
);

// Enable JSON body parsing
app.use(express.json());

// Import and use your API routes
app.use("/api", require("./Routes/Createuser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect to MongoDB and start server
mongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
