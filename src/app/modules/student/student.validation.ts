import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20, { message: "First Name can not be more then 20 character" }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .max(20, { message: "Last Name Can not be more then 20 character" }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  address: z.string().min(1),
  relation: z.string().min(1),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z
        .string()
        .min(1)
        .refine((value) => ["Male", "Female", "Other"].includes(value), {
          message: "Invalid Gender",
        }),

      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z
        .string()
        .min(1)
        .max(15, { message: "Contact Number Must Not Exceed 15 Character" }),
      emergencyContactNo: z.string().min(5).max(15, {
        message: "Emergency Contact no must not exceed 15 character",
      }),
      bloodGroup: z
        .string()
        .refine(
          (value) =>
            ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(value),
          { message: "Invalid Blood Group" }
        ),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});
export default createStudentValidationSchema;
