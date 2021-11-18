import mongoose from  "mongoose";

const clientSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
        roleId:{ type: mongoose.Schema.ObjectId, ref: "roles" },
        registerDate:{type:Date,default:Date.Now},
        dbStatus:Boolean
    }
);
const client=mongoose.model("client",clientSchema);

export default client;