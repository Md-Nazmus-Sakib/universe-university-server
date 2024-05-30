import cors from "cors";
import express, { Application, Request, Response } from "express";

import globalErrorHandler from "./app/middlwares/globalErrorHandler";
import notFound from "./app/middlwares/notFound";
import router from "./app/routes";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);
// app.use("/api/v1/students", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Global Error Handel
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
