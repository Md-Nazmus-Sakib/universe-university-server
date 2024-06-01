import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Academic faculty must be String.",
  }),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
};
