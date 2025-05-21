const jwt = require("jsonwebtoken");
const config = require("config");

const userGuard = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      return res.status(401).send({ message: "Token topilmadi" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.get("user_data.accessKey"));

    if (!decoded.email || !decoded.id) {
      return res.status(403).send({ message: "Noto'g'ri token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Token yaroqsiz yoki muddati tugagan" });
  }
};

module.exports = userGuard;
