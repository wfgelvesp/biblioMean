import book from "../models/books.js"
 //registrar cliente
 const  registerBook= async(req,res)=>{
     if(!req.body.name ||!req.body.author) return res.status(400).send("Data incomplete");

     const existingBook=await book.findOne({name:req.body.name});

     if(existingBook) return res.status(400).send("Book Existing");

     const bookSchema = new book(
         {
             name:req.body.name,
             author:req.body.author,
             yearPublication:req.body.yearPublication,
             pages:req.body.pages,
             gender:req.body.gender,
             price:req.body.price
         }
     );
     const result=await bookSchema.save();

     if (!result) return res.status(400).send("Falid register");

     return res.status(200).send({result});
 }

 const listBook = async (req,res)=>{
    const bookSchema= await book.find();

    if(!bookSchema || bookSchema.length==0) return res.status(400).send("Empty book list");

    return res.status(200).send({bookSchema});
};
const updateBook = async (req, res) => {
    if (!req.body.name || !req.body.author)
      return res.status(400).send("Incomplete data");
  
    const existingBook = await book.findOne({
      name: req.body.name,
      author: req.body.author
    });
    if (existingBook) return res.status(400).send("the book alrady exist");
  
    const bookUpdate = await book.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      author: req.body.author
    });
    if (!bookUpdate) return res.status(400).send("Error editing book");
  
    return res.status(200).send({ bookUpdate });
  };

  const deleteBook = async (req, res) => {
    const bookDelete = await book.findByIdAndDelete({ _id: req.params["_id"] });
    if (!bookDelete) return res.status(400).send("book not found");
  
    return res.status(200).send("book deleted");
  };

  const findBook = async (req, res) => {
    const bookId = await book.findById({ _id: req.params["_id"] });
    if (!bookId) return res.status(400).send("no search result");
  
    return res.status(200).send({ bookId });
  };

 export default {registerBook,listBook,updateBook,deleteBook,findBook};