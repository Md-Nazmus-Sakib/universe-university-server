import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentInfoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = "student";

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  // create a transaction session
  const session = await mongoose.startSession();

  try {
    //start the session
    session.startTransaction();

    //set generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed To Create User.");
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed To Create Student.");
    }
    // successfully save to the database
    await session.commitTransaction();

    //End the Session
    await session.endSession();

    return newStudent;
  } catch (err) {
    // if transaction-1 or transaction-2 is not successful then rollback the transaction
    await session.abortTransaction();
    //end the session
    await session.endSession();
  }
};
export const UserServices = {
  createStudentInfoDB,
};
