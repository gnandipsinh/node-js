import express from "express";
import helmet from "helmet";

const app = express();


// Application-Level Middleware

app.use((req, res, next) => {

    console.log("Application Middleware");

    next();

});


// Built-in Middleware

app.use(express.json());


// External Middleware

app.use(helmet());


// Router-Level Middleware

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


// Main Route

app.get("/", (req, res) => {

    res.json({
        message: "Please check messages"
    });

});


// Undefined Route Handling

app.use((req, res) => {

    res.status(404).send("Requested route not found");

});


// Centralized Error Middleware

app.use((error, req, res, next) => {

    if (res.headersSent) {

        return next(error);

    }

    res.status(error.statusCode || 500).json(
        error.message || "Internal Server Error"
    );

});


const port = 3000;

app.listen(port, (err) => {

    if (err) {

        return console.log("error", err);

    }

    console.log(`server running on port ${port}`);

});