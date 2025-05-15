import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import renderRoutes from "./routes/render";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/render", renderRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Worker bundle location: ${path.join(process.cwd(), "worker/src/bundle")}`,
  );
});
