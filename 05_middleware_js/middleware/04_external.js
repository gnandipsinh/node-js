import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.get("/", (req, res) => {

    res.send("Hello from External Middleware");

});

const port = 3000;

app.listen(port, (err) => {

    if (err) {
        return console.log("error", err);
    }

    console.log(`server running on port ${port}`);

});