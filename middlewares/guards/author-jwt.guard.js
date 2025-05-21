const { sendErrorResponse } = require("../../helpers/send_error_response");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtService = require("../../service/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ error: "Authorization header berilmagan" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ error: "Bearer token  berilmagan" });
    }

    // const decodedPayload = jwt.verify(token, config.get("tokenKey"));

    const decodedPayload = await jwtService.verifyAccessToken(token);
    // Email darsidan so'ng faollashtirqamiz
    // if (!decodedPayload.is_active) {
    //   return res.status(403).send({ error: "Active bo'lmagan foydalinuvchi" });
    // }
    req.author = decodedPayload;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
