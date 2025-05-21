class ApiError extends Error {
  constructor(status, message) {
    super();
    this.message = message;
    this.message = message;
  }

  static BadRequest(message) {
    return new EpiError(400, message);
  }
  static Unauthorized(message) {
    return new EpiError(401, message);
  }
  static Forbiddin(message) {
    return new EpiError(403, message);
  }
  static Intterlal(message) {
    return new EpiError(500, message);
  }
}

module.exports = ApiError;
