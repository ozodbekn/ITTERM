const jwt = require("jsonwebtoken");
const config = require("config");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.accessKey, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
  }

  async verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.refreshKey, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
  }
}



module.exports = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

exports.generateAdminTokens = (payload) => {
  const accessToken = jwt.sign(payload, config.get("accessKeyAdmin"), {
    expiresIn: config.get("accessTimeAdmin"),
  });
  const refreshToken = jwt.sign(payload, config.get("refreshKeyAdmin"), {
    expiresIn: config.get("refreshTimeAdmin"),
  });
  return { accessToken, refreshToken };
};

exports.verifyAdminRefreshToken = (token) => {
  return jwt.verify(token, config.get("refreshKeyAdmin"));
};