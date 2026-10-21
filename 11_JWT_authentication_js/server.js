
import express from "express";
import dotenv from "dotenv";
import HttpError from "./middleware/httpError.js";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new HttpError("Request route not found", 404));
});

// Error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const connected = await connectDB();

  if (!connected) {
    console.log("Database connection failed. Server not started.");
    return;
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
