import client from "../models/clients.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment  from "moment";
 //registrar cliente
 const  registerClient= async(req,res)=>{
     if(!req.body.name ||!req.body.email) return res.status(400).send("Data incomplete");

     const existingClient=await client.findOne({name:req.body.name});

     if(existingClient) return res.status(400).send("Client Existing");

    const hash = await bcrypt.hash(req.body.password,10) ;

     const clienteSchema = new client(
         {
             name:req.body.name,
             email:req.body.email,
             password:hash,
             dbStatus:true
         }
     );
     const result=await clienteSchema.save();

     if (!result) return res.status(400).send("Falid register");

     return res.status(200).send({result});
 }

 //registrar admin
 const registerAdmin = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send({ message: "Incomplete data" });

  const existingClient = await client.findOne({ email: req.body.email });
  if (existingClient)
    return res.status(400).send({ message: "The user is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userClient = new client({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  const result = await userClient.save();
  return !result
    ? res.status(400).send({ message: "Failed to register user" })
    : res.status(200).send({ result });
};


 const listClient = async (req,res)=>{
    const clientSchema= await client.find();

    if(!clientSchema || clientSchema.length==0) return res.status(400).send("Empty client list");

    return res.status(200).send({clientSchema});
};

const updateClient = async (req, res) => {
    if (!req.body.name || !req.body.email)
      return res.status(400).send("Incomplete data");
  
    let pass="";
    if(req.body.password){
      pass= await bcrypt.hash(req.body.password,10);
    }
    else{
      const clientFind= await cliente.findOne({email:req.body.email});
      pass=clientFind.password;
    }

    const existingClient = await client.findOne({
      name: req.body.name,
      email: req.body.email,
      password:pass
    });
    if (existingClient) return res.status(400).send("the client alrady exist");
  
    const clientUpdate = await client.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      email: req.body.email,      

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

  const login = async (req, res) => {
    if (!req.body.email || !req.body.password)
      return res.status(400).send({ message: "Incomplete data" });
  
    const clientLogin = await client.findOne({ email: req.body.email });
    if (!clientLogin)
      return res.status(400).send({ message: "Wrong email or password2" });
    
    const hash= await bcrypt.compare(req.body.password,clientLogin.password);
    if(!hash) return res.status(400).send({ message: "Wrong email or password 1" });
    console.log(hash)
  
      try {
        return res.status(200).json({
          token: jwt.sign({
            _id:clientLogin._id,
            name:clientLogin.name,
            email:clientLogin.email,
            iat:moment().unix(),
          },
          process.env.SECRET_KEY_JWT
          )
        });
        
      } catch (error) {
        return res.status(400).send({message:"Login ERROR "})
      }
  };
  
  
 export default {registerClient,listClient,updateClient,deleteClient,findClient,login,registerAdmin};