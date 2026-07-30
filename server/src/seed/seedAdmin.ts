import bcrypt from "bcryptjs";
import Admin from "../models/admin.model";

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: "admin" });

    if (adminExists) {
      console.log("✅ Super Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("✅ Super Admin created successfully.");
    console.log("Username : admin");
    console.log("Password : admin123");
  } catch (error) {
    console.error(error);
  }
};

export default seedAdmin;