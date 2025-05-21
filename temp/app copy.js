const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const indexRouter = require("../routes/index.routes.js");
const { expressWinstonLog } = require("../service/express_error_log.service.js");
const cookieParser = require("cookie-parser");
const errorHandlingMiddleware = require("../middlewares/errors/error-handling.middleware.js");
const logger = require("../service/logger.service.js");

const PORT = config.get("port") || 3030;

// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const winston = require("winston");
const expressWinston = require("express-winston");

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret_token);
// console.log(config.get("secret_token"));

// process.on("uncaughtException", (exception) => {
//   console.log("uncaughtException", exception.message);
// });

// process.on("unhandledRejection", (rejection) => {
//   console.log("UnhandledRejection", rejection);
// });

// logger.warn("Warn ma'lumoti");
// logger.info("Info ma'lumoti");
// logger.error("Error ma'lumoti");
// logger.log("info","Odddiy log");
// logger.debug("DUebug ma'lumoti");

const app = express();
app.use(cookieParser());
app.use(express.json());

const router = require("./my-express-router");
const requestErrorLogger = require("../middlewares/loggers/request.error.logger.js");
const requestLogger = require("../middlewares/loggers/request.logger.js");

app.use(requestLogger);

app.use(router); // notice how the router goes after the logger.
app.use("/api", indexRouter); //backendga kirish nuqtasi
app.use(errorHandlingMiddleware); //ErrorHandling eng oxirida yozilishi kerak

app.use(requestErrorLogger);

async function start() {
  try {
    const uri = config.get("dbUri");
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`Server started at https://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
