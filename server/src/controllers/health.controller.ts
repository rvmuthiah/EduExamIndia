import { Request, Response } from "express";

export const getHealth = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        project: "EduExam India (RankOne)",
        version: "1.0.0",
        message: "Backend is running successfully 🚀"
    });
};