// Load environment variables FIRST
const dotenv = require("dotenv");
dotenv.config();

// Import modules
const express = require("express");
const errorMiddleware = require("./middleware/error.middleware");
const connectDb = require("./config/connectDb");
const redisClient = require("./cache");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const handoverRoute = require("./routes/handover.route");

// Configuration
const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/handover", handoverRoute);

// Error middleware
app.use(errorMiddleware);

// Creating server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
