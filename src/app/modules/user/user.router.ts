import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import createStudentValidationSchema from "../student/student.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
