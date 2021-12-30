import dotenv from "dotenv";
import pino from "pino";

dotenv.config();

export default pino({
  enabled: true,
  level:
    process.env.LOGGER_LEVEL === "debug" ? process.env.LOGGER_LEVEL : "trace",
  prettyPrint: {
    levelFirst: true,
    colorize: process.env.LOGGER_LEVEL === "debug",
  },
});
