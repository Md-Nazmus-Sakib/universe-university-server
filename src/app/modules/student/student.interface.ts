import { Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  relation: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;

  needPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  name: TName;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  academicDepartment: string;
  profileImg?: string;
  isDeleted: boolean;
};
