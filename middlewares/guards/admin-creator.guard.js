const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    // logika
    if (req.admin.admin_is_creator != req.admin.id) {
      return res.status(403).send({
        message: "Ruxsat berilmagan foydalanuvchi.Siz Creator emassiz",
      });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
