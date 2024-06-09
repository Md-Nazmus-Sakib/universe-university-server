import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();
//=============================================
//Create Student Route
router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

//===============================================

//===========================================
//Create Faculty Route
router.post(
  "/create-faculty",

  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);
//==========================================

//===========================================
//Create Admin Route
router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

//==========================================

export const UserRoutes = router;
