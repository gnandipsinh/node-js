import express from "express";
import {
  addEmployee,
  getAllEmployees,
  deleteEmployee,
} from "../controller/employee.controller.js";

const router = express.Router();

router.post("/add", (req, res) => {
  res.json({
    message: "employee add route working",
  });
});

router.get("/all", getAllEmployees);

router.delete("/delete/:id", deleteEmployee);

export default router;
