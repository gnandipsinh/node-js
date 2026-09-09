import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello from my new server" });
});

// Undefined Routes

app.use((req, res, next) => {
  return next(new HttpError("request route not found", 404));
});

// Centralize Error

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statuscode || 500);

  res.json({
    message: error.message || "internal server error",
  });
});

const port = 5000;

async function StartServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect DB");
    }

    app.listen(port, (error) => {
      if (error) {
        return console.log(error.message);
      }

      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

StartServer();
