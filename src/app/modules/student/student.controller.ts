// import { Request, Response } from "express";
// import { UserServices } from "./user.service";

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { password, student: studentData } = req.body;

//     const result = await UserServices.createStudentInfoDB(
//       password,
//       studentData
//     );

//     res.status(200).json({
//       success: true,
//       message: "Student is Created Successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "Something Went Wrong .",
//       error: err,
//     });
//   }
// };

// export const UserControllers = {
//   createStudent,
// };
