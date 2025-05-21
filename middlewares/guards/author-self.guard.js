const { sendErrorResponse } = require("../../helpers/send_error_response")

module.exports=(req, res, next)=>{
    try {
        // logika
        if(req.params.id != req.author.id){
            return res.status(403).send({message:"Ruxsat berilmagan foydalanuvchi.Faqat shaxsiy ma'lumotlarni ko'rishi mumkin"})
        }
        
    } catch (error) {
     sendErrorResponse(error, res)   
    }
}