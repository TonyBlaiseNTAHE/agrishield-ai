import express from "express";
import cors from "cors";
import farmerRoutes from "./routes/farmer.routes.js";
import testRoutes from "./routes/test.routes.js";
import farmRoutes from "./routes/farm.routes.js";
import weatherRoutes from "./routes/weather.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/farmers", farmerRoutes);
app.use("/api/test", testRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/weather", weatherRoutes);
export default app;