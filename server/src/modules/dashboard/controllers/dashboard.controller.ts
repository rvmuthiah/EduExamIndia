import { Request, Response } from "express";

import {
  getAdminDashboard,
  getStudentDashboard,
} from "../services/dashboard.service";

// Admin Dashboard
export const adminDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dashboard = await getAdminDashboard();

    res.json({
      success: true,
      data: dashboard,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Student Dashboard
export const studentDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const studentId = Array.isArray(req.params.studentId)
      ? req.params.studentId[0]
      : req.params.studentId;

    const dashboard =
      await getStudentDashboard(studentId);

    res.json({
      success: true,
      data: dashboard,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};