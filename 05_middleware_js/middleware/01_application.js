import express from "express";

const app = express();

app.use((req, res, next) => {

    console.log("Application Middleware");

    next();

});

app.get("/", (req, res) => {

    res.send("Home Page");

});

const port = 3000;

app.listen(port, (err) => {

    if (err) {
        return console.log("error", err);
    }

    console.log(`server running on port ${port}`);

});