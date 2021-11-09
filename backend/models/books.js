import mongoose from  "mongoose";
const bookSchema = new mongoose.Schema(
    {
        name:String,
        author:String,
        yearPublication:{type:Date},
        registerDate:{type:Date,default:Date.Now},
        pages:Number,
        gender:String,
        price:Number
    }

);
const book=mongoose.model("books",bookSchema);

export default book;