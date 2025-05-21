const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    // logika
    if (req.author.is_export != req.author.id) {
      return res
        .status(403)
        .send({
          message: "Ruxsat berilmagan foydalanuvchi.Siz expert emassiz",
        });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
