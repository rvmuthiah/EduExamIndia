import { Request, Response } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentByEmail,
  generateStudentToken,
  getStudentLeaderboard,
} from "../services/student.service";

import bcrypt from "bcryptjs";

// =====================================================
// STUDENT REGISTRATION
// =====================================================

export const registerStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("STUDENT REGISTRATION BODY:", req.body);

    const student = await createStudent(req.body);

    const studentObject = student.toObject();

    const { password, ...studentData } = studentObject;

    res.status(201).json({
      success: true,
      message: "Student Registered Successfully",
      data: studentData,
    });
  } catch (error: unknown) {
    console.error("STUDENT REGISTRATION ERROR:", error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      res.status(409).json({
        success: false,
        message: "Email or Mobile number already registered",
      });

      return;
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to register student";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

// =====================================================
// STUDENT LOGIN
// =====================================================

export const loginStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Username and password are required",
      });

      return;
    }

    const Student = (
      await import("../models/student.model")
    ).default;

    const student =
      (await getStudentByEmail(username.trim())) ||
      (await Student.findOne({
        mobile: username.trim(),
      }));

    if (!student) {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });

      return;
    }

    if (student.status !== "Active") {
      res.status(403).json({
        success: false,
        message: "Student account is inactive",
      });

      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });

      return;
    }

    const token = generateStudentToken(student);

    const studentObject = student.toObject();

    const { password: studentPassword, ...studentData } =
      studentObject;

    res.status(200).json({
      success: true,
      message: "Student Login Successful",
      token,
      data: studentData,
    });
  } catch (error: unknown) {
    console.error("STUDENT LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to login student",
    });
  }
};

// =====================================================
// GET ALL STUDENTS
// =====================================================

export const getStudents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await getAllStudents();

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to get students",
    });
  }
};

// =====================================================
// GET STUDENT BY ID
// =====================================================

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
        message: "Student not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("GET STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to get student",
    });
  }
};

// =====================================================
// UPDATE STUDENT
// =====================================================

export const editStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student = await updateStudent(
      id,
      req.body
    );

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      data: student,
    });
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update student",
    });
  }
};

// =====================================================
// DELETE STUDENT
// =====================================================

export const removeStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student = await deleteStudent(id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete student",
    });
  }
};

// =====================================================
// STUDENT LEADERBOARD
// =====================================================

export const leaderboard = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getStudentLeaderboard();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load leaderboard",
    });
  }
};