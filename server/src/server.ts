import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/database";
import seedAdmin from "./seed/seedAdmin";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
await connectDB();

await seedAdmin();

app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});
};

startServer();


// import dotenv from "dotenv";
// dotenv.config();

// console.log(process.env.MONGODB_URI);