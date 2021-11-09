import mongoose from  "mongoose";
const providerSchema = new mongoose.Schema(
  {
      name:String,
      address:String,
      registerDate:{type:Date,default:Date.Now}
  }
);
const providers=mongoose.model("providers",providerSchema);

export default providers;