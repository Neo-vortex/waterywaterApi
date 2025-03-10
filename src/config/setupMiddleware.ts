import express, { Express, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../build/swagger.json";
import cors from "cors";
import limiter from "./rateLimit";

const setupMiddleware = (app: Express) => {
  // CORS
  app.use(cors({ origin: "http://localhost:8000" }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rate limiter
  app.use(limiter);

  // Security headers
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupMiddleware;
