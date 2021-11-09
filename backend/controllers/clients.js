import client from "../models/clients.js"
 //registrar cliente
 const  registerClient= async(req,res)=>{
     if(!req.body.name ||!req.body.email) return res.status(400).send("Data incomplete");

     const existingClient=await client.findOne({name:req.body.name});

     if(existingClient) return res.status(400).send("Client Existing");

     const clienteSchema = new client(
         {
             name:req.body.name,
             email:req.body.email,
             password:req.body.password,
             dbStatus:true
         }
     );
     const result=await clienteSchema.save();

     if (!result) return res.status(400).send("Falid register");

     return res.status(200).send({result});
 }

 const listClient = async (req,res)=>{
    const clientSchema= await client.find();

    if(!clientSchema || clientSchema.length==0) return res.status(400).send("Empty client list");

    return res.status(200).send({clientSchema});
};

const updateClient = async (req, res) => {
    if (!req.body.name || !req.body.email)
      return res.status(400).send("Incomplete data");
  
    const existingClient = await client.findOne({
      name: req.body.name,
      email: req.body.email
    });
    if (existingClient) return res.status(400).send("the client alrady exist");
  
    const clientUpdate = await client.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      email: req.body.email,      
      password:req.body.password

    });
    if (!clientUpdate) return res.status(400).send("Error editing client");
  
    return res.status(200).send({ clientUpdate });
  };

  const deleteClient = async (req, res) => {
    const clientDelete = await client.findByIdAndDelete({ _id: req.params["_id"] });
    if (!clientDelete) return res.status(400).send("client not found");
  
    return res.status(200).send("client deleted");
  };
  const findClient = async (req, res) => {
    const clientId = await client.findById({ _id: req.params["_id"] });
    if (!clientId) return res.status(400).send("no search result");
  
    return res.status(200).send({ clientId });
  };
 export default {registerClient,listClient,updateClient,deleteClient,findClient};