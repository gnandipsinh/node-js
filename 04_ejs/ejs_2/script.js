import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

let studentList = [
  {
    id: 1,
    name: "Gnandipsinh",
  },
  {
    id: 2,
    name: "gmgohil",
  },
  {
    id: 3,
    name: "gohil",
  },
];

// Home page
app.get("/", (req, res) => {
  res.render("index", { studentList });
});

// Add page
app.get("/add", (req, res) => {
  res.render("add");
});

// Add student
app.post("/add", (req, res) => {
  const { name } = req.body;

  const newStudent = {
    id: new Date().getTime(),
    name,
  };

  studentList.push(newStudent);

  res.redirect("/");
});

// Delete student
app.get("/delete/:id", (req, res) => {
  const { id } = req.params;

  const student = studentList.find((m) => m.id === Number(id));

  if (!student) {
    return res.json({
      message: "Student not found",
    });
  }

  studentList = studentList.filter((m) => m.id !== student.id);

  res.redirect("/");
});

// Edit page
app.get("/edit/:id", (req, res) => {
  const { id } = req.params;

  const student = studentList.find((m) => m.id === Number(id));

  if (!student) {
    return res.json({
      message: "Student not found",
    });
  }

  res.render("edit", { student });
});

// Update student
app.post("/edit/:id", (req, res) => {
  const { id } = req.params;

  const student = studentList.find((m) => m.id === Number(id));

  if (!student) {
    return res.json({
      message: "Student not found",
    });
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
