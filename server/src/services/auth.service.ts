import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model";

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