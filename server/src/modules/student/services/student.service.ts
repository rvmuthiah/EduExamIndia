import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student, { IStudent } from "../models/student.model";
import Result from "../../result/models/result.model";

// =====================================================
// CREATE STUDENT
// =====================================================

export const createStudent = async (
  studentData: Partial<IStudent>
) => {
  const {
    name,
    email,
    mobile,
    password,
    board,
    standard,
    school,
    parentName,
    parentMobile,
    subscriptionType,
    status,
  } = studentData;

  // ---------------------------------------------
  // Validate required fields
  // ---------------------------------------------

  if (
    !name ||
    !email ||
    !mobile ||
    !password ||
    !board ||
    !standard ||
    !school ||
    !parentName ||
    !parentMobile
  ) {
    throw new Error("All required fields must be provided");
  }

  // ---------------------------------------------
  // Check duplicate email/mobile
  // ---------------------------------------------

  const existingStudent = await Student.findOne({
    $or: [
      {
        email: email.toLowerCase().trim(),
      },
      {
        mobile: mobile.trim(),
      },
    ],
  });

  if (existingStudent) {
    throw new Error(
      "Email or Mobile number already registered"
    );
  }

  // ---------------------------------------------
  // Hash password
  // ---------------------------------------------

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // ---------------------------------------------
  // Create student
  // ---------------------------------------------

  const student = await Student.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    mobile: mobile.trim(),
    password: hashedPassword,
    board,
    standard: Number(standard),
    school: school.trim(),
    parentName: parentName.trim(),
    parentMobile: parentMobile.trim(),
    subscriptionType:
      subscriptionType || "Free",
    status: status || "Active",
  });

  return student;
};

// =====================================================
// GET ALL STUDENTS
// =====================================================

export const getAllStudents = async () => {
  return await Student.find()
    .select("-password")
    .sort({
      createdAt: -1,
    });
};

// =====================================================
// GET STUDENT BY ID
// =====================================================

export const getStudentById = async (
  id: string
) => {
  return await Student.findById(id)
    .select("-password");
};

// =====================================================
// GET STUDENT BY EMAIL
// =====================================================

export const getStudentByEmail = async (
  email: string
) => {
  return await Student.findOne({
    email: email.toLowerCase().trim(),
  });
};

// =====================================================
// UPDATE STUDENT
// =====================================================

export const updateStudent = async (
  id: string,
  data: Partial<IStudent>
) => {
  if (data.password) {
    data.password = await bcrypt.hash(
      data.password,
      10
    );
  }

  return await Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};

// =====================================================
// DELETE STUDENT
// =====================================================

export const deleteStudent = async (
  id: string
) => {
  return await Student.findByIdAndDelete(id);
};

// =====================================================
// GENERATE STUDENT TOKEN
// =====================================================

export const generateStudentToken = (
  student: IStudent
) => {
  return jwt.sign(
    {
      id: student._id,
      username: student.email,
      role: "Student",
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

// =====================================================
// STUDENT LEADERBOARD
// =====================================================
//
// One entry per student.
// If a student has multiple results,
// only their BEST percentage is used.
//
// Ranking:
// 1. Percentage DESC
// 2. Score DESC
// 3. Correct Answers DESC
//
// =====================================================

export const getStudentLeaderboard =
  async () => {
    const results = await Result.find()
      .populate(
        "studentId",
        "name email board standard"
      )
      .populate(
        "examId",
        "title"
      )
      .sort({
        percentage: -1,
        score: -1,
        correctAnswers: -1,
      });

    // ---------------------------------------------
    // Keep only BEST result for each student
    // ---------------------------------------------

    const bestResults = new Map<
      string,
      (typeof results)[number]
    >();

    for (const result of results) {
      if (!result.studentId) {
        continue;
      }

      const student = result.studentId as unknown as {
        _id: string;
      };

      const studentId =
        String(student._id);

      if (!bestResults.has(studentId)) {
        bestResults.set(
          studentId,
          result
        );
      }
    }

    // ---------------------------------------------
    // Convert Map to Array
    // ---------------------------------------------

    const leaderboard = Array.from(
      bestResults.values()
    );

    // ---------------------------------------------
    // Add Rank
    // ---------------------------------------------

    return leaderboard.map(
      (result, index) => ({
        rank: index + 1,

        studentId: result.studentId,

        examId: result.examId,

        score: result.score,

        totalMarks: result.totalMarks,

        percentage:
          result.percentage,

        correctAnswers:
          result.correctAnswers,

        wrongAnswers:
          result.wrongAnswers,

        status: result.status,
      })
    );
  };