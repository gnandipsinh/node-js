import express from "express";
import HttpError from "./middleware/HttpError.js";

const app = express();

const taskList = [
    {
        id: 1,
        task: "Learn JavaScript",
        description: "Practice arrays, objects"
    },
    {
        id: 2,
        task: "Learn Node.js",
        description: "Understand servers."
    },
    {
        id: 3,
        task: "Learn Express.js",
        description: "Practice routes operations."
    }
];

app.get("/", (req, res) => {

    return res.json({
        message: "Express CRUD"
    });

});

app.get("/taskList", (req, res, next) => {

    if (taskList.length === 0) {

        return res.status(200).json({
            message: "No task available"
        });

    }

    res.status(200).json({
        message: "Task list retrieved successfully",
        taskList
    });

});

    app.get("/taskList/:id",(req,res,next)=>
    {
        const {id}=req.params;

        const task=taskList.find((t)=>t.id==Number(id));

        if(!task==undefined)
        {
            return next(res.HttpError("Task not found",404));
        }

        return res.status(200).json({
            message:"task retrieved successfully",task
        });
    });




app.use((req, res, next) => {

    return next(new HttpError("Request not Found"));

});




app.use((error, req, res, next) => {

    if (res.headersSent) {

        return next(error);

    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
    });

});


const port = 5000;

app.listen(port, (err) => {

    if (err) {

        return console.log(err.message);

    }

    console.log(`server running on port ${port}`);

});