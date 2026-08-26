import express from "express";

import HttpError from "./middleware/HttpError.js";

const app = express();

app.use(express.json());

const taskList = [
    {
        id: 1,
        task: "Learn Node.js",
        description: "Understand Node.js modules."
    },
    {
        id: 2,
        task: "Learn Express.js",
        description: "Learn routes, middleware."
    },
    {
        id: 3,
        task: "Build CRUD API",
        description: "Create APIs for adding."
    }
];


app.get("/", (req, res) => {

    res.json({
        message: "Express Crud operation"
    });

});




app.get("/taskList", (req, res, next) => {

    if (taskList.length === 0) {

        return res.status(200).json({
            message: "no task data available"
        });

    }

    res.status(200).json({
        message: "Data retrieved successfully",
        taskList
    });

});



app.get("/taskList/:id", (req, res, next) => {

    try {

        const { id } = req.params;

        const task = taskList.find(
            (t) => t.id === Number(id)
        );

        if (task === undefined) {

            return next(
                new HttpError("Task not found", 404)
            );

        }

        res.status(200).json({
            message: "id visible",
            task
        });

    }
    catch (error) {

        return next(
            new HttpError("Request not found")
        );

    }

});




app.post("/task/add", (req, res, next) => {

    try {

        const { task, description } = req.body;

        if (task === undefined || description === undefined) {

            return next(
                new HttpError(
                    "task or description data are required",
                    400
                )
            );

        }

        const newTask = {

            id: new Date().getTime(),
            task,
            description

        };

        taskList.push(newTask);

        res.status(201).json({
            success: true,
            message: "new task added successfully",
            newTask
        });

    }
    catch (err) {

        return next(
            new HttpError("Request not found")
        );

    }

});




app.delete("/task/:id", (req, res, next) => {

    try {

        const { id } = req.params;

        const deleteData = taskList.findIndex(
            (t) => t.id === Number(id)
        );

        if (deleteData === -1) {

            return next(
                new HttpError(
                    "task not found in id",
                    404
                )
            );

        }

        const deletedTask = taskList.splice(
            deleteData,
            1
        );

        res.status(200).json({
            success: true,
            message: "task deleted successfully",
            deletedTask
        });

    }
    catch (err) {

        return next(
            new HttpError("request not found")
        );

    }

});




app.patch("/task/:id", (req, res, next) => {

    try {

        const { id } = req.params;

        const { task, description } = req.body;

        const dataTask = taskList.find(
            (t) => t.id === Number(id)
        );

        if (dataTask === undefined) {

            return next(
                new HttpError(
                    "task not found id is updated",
                    404
                )
            );

        }

        if (task !== undefined) {

            dataTask.task = task;

        }

        if (description !== undefined) {

            dataTask.description = description;

        }

        if (
            task === undefined &&
            description === undefined
        ) {

            return next(
                new HttpError(
                    "task or description data is required",
                    400
                )
            );

        }

        res.status(200).json({
            success: true,
            message: "task data updated",
            dataTask
        });

    }
    catch (err) {

        return next(
            new HttpError("request not found")
        );

    }

});




app.use((req, res, next) => {

    return next(
        new HttpError("Request not found", 404)
    );

});


// Centralized Middleware

app.use((error, req, res, next) => {

    if (res.headersSent) {

        return next(error);

    }

    res.status(error.statusCode || 500).json({

        message:
            error.message ||
            "internal server error"

    });

});


const port = 5000;

app.listen(port, (err) => {

    if (err) {

        return console.log(err);

    }

    console.log(
        `server running on port ${port}`
    );

});