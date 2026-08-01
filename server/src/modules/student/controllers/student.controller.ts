import { Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentByEmail,
  generateStudentToken,
} from "../services/student.service";

// Register Student
export const registerStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await createStudent(req.body);

    // Remove password before sending response
   const studentObj = student.toObject();

// Remove password from response
const { password, ...studentData } = studentObj;

res.status(201).json({
  success: true,
  message: "Student Registered Successfully",
  data: studentData,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Students
export const getStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await getAllStudents();

    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Get Student By ID
export const getStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student = await getStudentById(id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
      return;
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Update Student
export const editStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student = await updateStudent(id, req.body);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Student Updated Successfully",
      data: student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

// Delete Student
export const removeStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteStudent(id);

    res.json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

export const loginStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try { 
    const { email, password } = req.body;
       console.log("Login Email:", email);
console.log("Entered Password:", password);

    // Find student by email
    const student = await getStudentByEmail(email);
    console.log("Student Found:", student);

    if (!student) {
      res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
      return;
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      student.password
    );
    console.log("Password Match:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
      return;
    }

    // Generate JWT
    const token = generateStudentToken(student);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        token,
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          board: student.board,
          standard: student.standard,
        },
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};