import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let StudentList = [
    {
        id: 1,
        name: "gohil"
    },
    {
        id: 2,
        name: "gnandipsinh"
    },
    {
        id: 3,
        name: "mahipalsinh"
    }
];

app.get("/", (req, res) => {
    res.render("index", { StudentList });
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", (req, res) => {

    const { name } = req.body;

    const newstudent = {
        id: new Date().getTime(),
        name
    };

    StudentList.push(newstudent);

    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {

    const { id } = req.params;

    const student = StudentList.find((m) => m.id === Number(id));

    if (!student) {
        return res.json({ message: "student not found" });
    }

    StudentList = StudentList.filter((m) => m.id !== student.id);

    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {

    const { id } = req.params;

    const student = StudentList.find((m) => m.id === Number(id));

    if (!student) {
        return res.json({ message: "student not found" });
    }

    res.render("edit", { student });
});

app.post("/edit/:id", (req, res) => {

    const { id } = req.params;

    const student = StudentList.find((m) => m.id === Number(id));

    if (!student) {
        return res.json({ message: "Student not found" });
    }

    const { name } = req.body;

    student.name = name;

    res.redirect("/");
});

const port = 5000;

app.listen(port, (err) => {

    if (err) {
        console.log(err);
    }

    console.log(`server running on port ${port}`);
});
