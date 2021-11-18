import jwt from "jsonwebtoken";

const auth = async (req,res,next)=>{
    let token = req.header("Authorization");//vemos si hay token
    if(!token) return res.status(400).send({message:"Authorization denied: No token"});

    //separar la palabra Bearer
    token=token.split(" ")[1];
    if(!token) return res.status(400).send({message:"Authorization denied: No token"});

    try{
        req.user=jwt.verify(token,process.env.SECRET_KEY_JWT)
        next();
    }catch(e){
        res.status(400).send({message:"token invalid"});
    }
}
export default auth;