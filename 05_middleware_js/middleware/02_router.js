import express from "express";

const app = express();

const router = express.Router();

router.use((req, res, next) => {

    console.log("Router Middleware");

    next();

});

router.get("/home", (req, res) => {

    res.send("Home");

});

router.get("/about", (req, res) => {

    res.send("About");

});

app.use("/user", router);

const port = 3000;

app.listen(port, (err) => {

    if (err) {
        return console.log("error", err);
    }

    console.log(`server running on port ${port}`);

});