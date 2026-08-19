import express from "express";

const app = express();

app.get("/", (req, res) => {

    res.send("Home Page");

});

app.use((req, res) => {

    res.status(404).send("requested route not found");

});

const port = 3000;

app.listen(port, (err) => {

    if (err) {
        return console.log("error", err);
    }

    console.log(`server running on port ${port}`);

});