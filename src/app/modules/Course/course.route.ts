import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";

const router = Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);

router.get("/", CourseController.getAllCourse);

router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);

export const CourseRoute = router;
