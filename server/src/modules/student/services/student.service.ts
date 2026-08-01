import Student, { IStudent } from "../models/student.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create Student
export const createStudent = async (
  data: Partial<IStudent>
) => {
  const hashedPassword = await bcrypt.hash(
    data.password as string,
    10
  );

  data.password = hashedPassword;

  return await Student.create(data);
};

// Get All Students
export const getAllStudents = async () => {
  return await Student.find();
};

// Get Student By ID
export const getStudentById = async (id: string) => {
  return await Student.findById(id);
};

// Update Student
export const updateStudent = async (
  id: string,
  data: Partial<IStudent>
) => {
  return await Student.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// Delete Student
export const deleteStudent = async (id: string) => {
  return await Student.findByIdAndDelete(id);
};

export const getStudentByEmail = async (email: string) => {
  return await Student.findOne({ email });
};


export const generateStudentToken = (student: IStudent) => {
  return jwt.sign(
    {
      id: student._id,
      email: student.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};