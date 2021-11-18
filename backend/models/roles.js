import mongoose from  "mongoose";
const roleSchema = new mongoose.Schema(
  {
      name:String,
      description:String,
      registerDate:{type:Date,default:Date.Now}
  }
);
const roles=mongoose.model("roles",roleSchema);

export default roles;