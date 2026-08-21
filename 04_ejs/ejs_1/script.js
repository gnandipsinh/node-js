import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const StudentList = [

    {
        name: "Gandipsinh",
        age: 18
    },

    {
        name: "golu",
        age: 20
    }

];

app.get("/", (req, res) => {

    res.render("index", { StudentList });

});

app.get("/add", (req, res) => {

    res.render("add");

});

app.post("/add", (req, res) => {

    const { name, age } = req.body;

    const newStudent = {

        id: new Date().getTime(),
        name,
        age

    };

    StudentList.push(newStudent);

    res.redirect("/");

});

const port = 5000;

app.listen(port, (error) => {

    if (error) {
        console.log(error);
    }

    console.log(`My server running on port ${port}`);

});