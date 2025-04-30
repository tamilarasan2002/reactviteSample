import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
        email:{
            type:String,
            required : [true,'Email is required!'],
            trim:true,
            unique : [true,'Email should be unique!'],
            minLength:[5,'Email should be five characters'],
            lowercase:true
        },
        password:{
            type:String,
            required : [true,'Password is required!'],
            trim:true,
            select: false
        },
        verified : {
            type:Boolean,
            default:false
        },   
        verificationCode : {
            type:String,
            select:false
        }, 
        verificationCodeValidaton : {
            type:String,
            select:false
        },
        forgotPasswordCode : {
            type:Number,
            select:false
        },
        forgotPasswordCodeValidation : {
            type:Number,
            select:false
        }, 

    },{
        timestamps:true
    })
export const User = mongoose.model('User',UserSchema);


