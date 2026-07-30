import { Request, Response } from "express";
import { loginAdmin } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {

  try {

    const { username, password } = req.body;

    const result = await loginAdmin(username, password);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    res.status(401).json({
      success: false,
      message: error.message,
    });

  }

};