import express from "express";

const app = express();

app.get("/", (req, res) => {

    throw new Error("Something went wrong");

});

app.use((error, req, res, next) => {

    if (res.headersSent) {

        return next(error);

    }

    res.status(error.statusCode || 500).json(
        error.message || "internal server error"
    );

});

const port = 3000;

app.listen(port, (err) => {

    if (err) {
        return console.log("error", err);
    }

    console.log(`server running on port ${port}`);

});