import providers from "../models/providers.js";

const registerProvider=async(req,res) => {
    if(!req.body.name || !req.body.address)
        return res.status(400).send("Incomplete data");

    const existingProvider =await providers.findOne({name:req.body.name});
    if(existingProvider) return res.status(400).send("the Provider alrady exist");
    
    const providerSchema = new providers(
        {
            name:req.body.name,
            address:req.body.address
        }
    );
    
    const result=await providerSchema.save();
    if(!result) return res.status(400).send("failed to register provider");

    return res.status(200).send({result});
    
};
const listProviders = async (req,res)=>{
    const providerSchema= await providers.find();

    if(!providerSchema || providerSchema.length==0) return res.status(400).send("Empty provider list");

    return res.status(200).send({providerSchema});
};
const updateProviders = async (req, res) => {
    if (!req.body.name || !req.body.address)
      return res.status(400).send("Incomplete data");
  
    const existingProvider = await providers.findOne({
      name: req.body.name,
      address: req.body.address
    });
    if (existingProvider) return res.status(400).send("the provider alrady exist");
  
    const providerUpdate = await providers.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      address: req.body.address
    });
    if (!providerUpdate) return res.status(400).send("Error editing provider");
  
    return res.status(200).send({ providerUpdate });
  };

  const deleteProvider = async (req, res) => {
    const providerDelete = await providers.findByIdAndDelete({ _id: req.params["_id"] });
    if (!providerDelete) return res.status(400).send("provider not found");
  
    return res.status(200).send("provider deleted");
  };
 
export default {registerProvider,listProviders,updateProviders,deleteProvider};