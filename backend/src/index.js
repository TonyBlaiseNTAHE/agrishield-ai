import dotenv from "dotenv";
import path from "path";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));  
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});