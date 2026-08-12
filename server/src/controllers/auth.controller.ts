import {Request, Response} from "express";

import {
  loginAdmin,
  loginStudent,
} from "../services/auth.service";

// =====================================================
// ADMIN LOGIN
// =====================================================

export const login = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {username, password} = req.body;

    const result = await loginAdmin(
      username,
      password,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Admin Login Error:", error);

    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// STUDENT LOGIN
// =====================================================

export const studentLogin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {username, password} = req.body;

    const result = await loginStudent(
      username,
      password,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Student Login Error:", error);

    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};