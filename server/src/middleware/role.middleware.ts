import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorize =
  (...roles: string[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    console.log("========== AUTHORIZATION CHECK ==========");
    console.log("User Role:", req.user.role);
    console.log("Allowed Roles:", roles);
    console.log("==========================================");

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access Denied",
      });
      return;
    }

    next();
  };