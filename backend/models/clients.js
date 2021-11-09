import mongoose from  "mongoose";

const clientSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
        registerDate:{type:Date,default:Date.Now},
        dbStatus:Boolean
    }
);
const client=mongoose.model("client",clientSchema);

export default client;