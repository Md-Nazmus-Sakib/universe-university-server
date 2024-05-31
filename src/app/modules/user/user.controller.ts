import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  // console.log(password, studentData);
  const result = await UserServices.createStudentInfoDB(password, studentData);

  // res.status(200).json({
  //   success: true,
  //   message: "Student is Created Successfully",
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Created Successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
