import express from "express";

import studentControllers from "../controller/studentController.js";

<<<<<<< HEAD
const router = express.Router();

router.post("/add", studentControllers.add);

router.get("/getAllStudents", studentControllers.getAllStudentData);

router.delete("/deleteAll", studentControllers.deleteAllData);

router.get("/:id", studentControllers.getStudentById);

router.delete("/:id", studentControllers.deleteStudent);

export default router;
=======
const Router = express.Router();

Router.post("/add", studentController.add);

Router.get("/studentData", studentController.studentGetData);

Router.delete("/allDelete", studentController.deleteAllData);
Router.get("/:id", studentController.studentDataById);

Router.delete("/:id", studentController.studentDataDelete);
// Router.patch("/:id",studentController.StudentUpdateData);
Router.patch("/:id", studentController.StudentUpdateManually);

export default Router;
>>>>>>> 9a1c611 (new code added)
