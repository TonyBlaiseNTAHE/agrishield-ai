import express from "express";
import cors from "cors";
import farmerRoutes from "./routes/farmer.routes.js";
import testRoutes from "./routes/test.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/farmers", farmerRoutes);
app.use("/api/test", testRoutes);
export default app;