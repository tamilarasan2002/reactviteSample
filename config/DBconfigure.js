import mongoose from "mongoose";

export const DBConnection = () =>{
    
    mongoose.connect(process.env.MongoDbUrl).then(()=>console.log('DB Connected')).catch((err)=>console.log(err));
    

    
} 