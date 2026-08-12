import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model";
import Student from "../modules/student/models/student.model";

export const loginAdmin = async (
  username: string,
  password: string
) => {

  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new Error("Invalid Username");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
  {
    id: admin._id,
    username: admin.username,
    role: "Admin",
  },
  process.env.JWT_SECRET as string,
  {
    expiresIn: "7d",
  }
);

  return {
    token,
    username: admin.username,
  };
};

// =====================================================
// STUDENT LOGIN
// =====================================================

export const loginStudent = async (
  username: string,
  password: string,
) => {
  const student = await Student.findOne({
    $or: [
      {email: username},
      {mobile: username},
    ],
  });

  if (!student) {
    throw new Error("Invalid Student Username");
  }

  if (student.status !== "Active") {
    throw new Error("Student account is inactive");
  }

  const isMatch = await bcrypt.compare(
    password,
    student.password,
  );

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: student._id,
      username: student.email,
      role: "Student",
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    studentId: student._id,
    username: student.email,
    name: student.name,
    role: "Student",
  };
};