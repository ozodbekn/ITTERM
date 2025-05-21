const { createLogger, format, transports } = require("winston");
const config = require("config");
require("winston-mongodb");
const { combine, timestamp, label, printf, prettyPrint, json, colorize } =
  format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    // colorize({ all: true }), //Oddiy konsolga chiqarganimizda oddiy formatda//faylga foydasi yo'q
    label({ label: "ITTERM" }),
    timestamp(),
    myFormat
    // json()
  ),
  transports: [
    new transports.Console({ level: "silly" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combine.log", level: "info" }),
    new transports.MongoDB({
      db: config.get("dbUri"),
      collection: "log",
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exception.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejection.log" })],
});

logger.exitOnError = false; // umumiy qilmoqchi bo'lsak oxiriga qo'yaimz

module.exports = logger;
