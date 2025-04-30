 const Joi = require('joi')

 exports.signupSchema = Joi.object({
    email: Joi.string().min(6).max(50).required().email({tlds:{allow:['com','net']}}),
    password:Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$'))

 })
 exports.signinSchema = Joi.object({
    email: Joi.string().min(6).max(50).required().email({tlds:{allow:['com','net']}}),
    password:Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$'))

 })

 exports.verifiyCodeSchema = Joi.object({
    email: Joi.string().min(6).max(50).required().email({tlds:{allow:['com','net']}}),
    verifyCode:Joi.number() 

 })

 exports.BookSchema = Joi.object({
   email: Joi.string().min(6).max(50).required().email({tlds:{allow:['com','net']}}),
})


// user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     book_id: String,
//     book_author: String,
//     book_image: String,
//     book_category: String,
//     book_publisher: String,
//     book_pagecount: Number,
//     book_uploadedurl: String,