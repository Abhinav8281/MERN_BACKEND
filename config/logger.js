const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),

  transports: [
    // 🔴 Error logs
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // 🟢 All logs
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

module.exports = logger;