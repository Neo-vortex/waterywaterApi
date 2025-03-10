import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const limiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,
  // 5 requests per ip in production
  max: process.env.NODE_ENV === "development" ? 10000 : 5,
});

export default limiter;
