import role from "../models/roles.js";

const admin = async (req,res,next)=>{
    const adminRole=await role.findById(req.user.roleId);
    if(!adminRole) return res.status(200).send({message:"Role not found"});

    return adminRole.name==="admin"
    ? next()
    :res.status(400).send({message:"authorized user"});
}

export default admin;