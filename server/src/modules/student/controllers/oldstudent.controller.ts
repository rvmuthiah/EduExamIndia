// import { Request, Response } from "express";
// import Result from "../../result/models/result.model";
// import bcrypt from "bcrypt";

// import {
//   createStudent,
//   getAllStudents,
//   getStudentById,
//   updateStudent,
//   deleteStudent,
//   getStudentByEmail,
//   generateStudentToken,
// } from "../services/student.service";

// // Register Student
// export const registerStudent = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     console.log("STUDENT REGISTRATION BODY:", req.body);

//     const student = await createStudent(req.body);

//     const studentObj = student.toObject();

//     const { password, ...studentData } = studentObj;

//     res.status(201).json({
//       success: true,
//       message: "Student Registered Successfully",
//       data: studentData,
//     });
//   } catch (error: unknown) {
//     console.error("STUDENT REGISTRATION ERROR:", error);

//     // Mongo duplicate key
//     if (
//       typeof error === "object" &&
//       error !== null &&
//       "code" in error &&
//       (error as { code?: number }).code === 11000
//     ) {
//       res.status(409).json({
//         success: false,
//         message: "Email or Mobile number already registered",
//       });
//       return;
//     }

//     if (error instanceof Error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//       return;
//     }

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // Get All Students
// export const getStudents = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const students = await getAllStudents();

//     res.json({
//       success: true,
//       data: students,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//     });
//   }
// };

// // Get Student By ID
// export const getStudent = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const id = Array.isArray(req.params.id)
//       ? req.params.id[0]
//       : req.params.id;

//     const student = await getStudentById(id);

//     if (!student) {
//       res.status(404).json({
//         success: false,
//         message: "Student Not Found",
//       });
//       return;
//     }

//     res.json({
//       success: true,
//       data: student,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//     });
//   }
// };

// // Update Student
// export const editStudent = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const id = Array.isArray(req.params.id)
//       ? req.params.id[0]
//       : req.params.id;

//     const student = await updateStudent(id, req.body);

//     if (!student) {
//       res.status(404).json({
//         success: false,
//         message: "Student Not Found",
//       });
//       return;
//     }

//     res.json({
//       success: true,
//       message: "Student Updated Successfully",
//       data: student,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//     });
//   }
// };

// // Delete Student
// export const removeStudent = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const id = Array.isArray(req.params.id)
//       ? req.params.id[0]
//       : req.params.id;

//     await deleteStudent(id);

//     res.json({
//       success: true,
//       message: "Student Deleted Successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//     });
//   }
// };

// export const loginStudent = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       res.status(400).json({
//         success: false,
//         message: "Username and password are required",
//       });
//       return;
//     }

//     const student = await getStudentByEmail(
//       username
//     );

//     if (!student) {
//       res.status(401).json({
//         success: false,
//         message: "Invalid Email or Password",
//       });
//       return;
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       student.password
//     );

//     if (!isPasswordCorrect) {
//       res.status(401).json({
//         success: false,
//         message: "Invalid Email or Password",
//       });
//       return;
//     }

//     if (student.status !== "Active") {
//       res.status(403).json({
//         success: false,
//         message: "Student account is inactive",
//       });
//       return;
//     }

//     const token = generateStudentToken(student);

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       data: {
//         token,
//         studentId: student._id,
//         username: student.email,
//         name: student.name,
//         role: "Student",
//       },
//     });
//   } catch (error) {
//     console.error(
//       "STUDENT LOGIN ERROR:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // =====================================================
// // STUDENT LEADERBOARD
// // =====================================================

// export const leaderboard = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const results = await Result.find()
//       .populate("studentId", "name email board standard")
//       .populate("examId", "title")
//       .sort({
//         percentage: -1,
//         score: -1,
//         createdAt: 1,
//       });

//     const leaderboardData = results.map((result, index) => ({
//       rank: index + 1,
//       studentId: result.studentId,
//       examId: result.examId,
//       score: result.score,
//       totalMarks: result.totalMarks,
//       percentage: result.percentage,
//       correctAnswers: result.correctAnswers,
//       wrongAnswers: result.wrongAnswers,
//       status: result.status,
//     }));

//     return res.status(200).json({
//       success: true,
//       data: leaderboardData,
//     });
//   } catch (error) {
//     console.error("LEADERBOARD ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to load leaderboard",
//     });
//   }
// };


