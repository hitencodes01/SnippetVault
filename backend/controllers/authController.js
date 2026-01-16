import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export async function handleRegister(req, res) {
  const {name , email , password} = await req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exist" });
  }
  const user = await User.create({ name, email, password });
  if (user) {
     res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }else {
     res.status(400).json({message : "Invalid Data"})
  }
}


export async function handleLogin(req,res){
   const {email , password} = req.body
   const user = await User.findOne({email})
   if(user && (await user.matchPassword(password))){
     res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
   }else{
    res.status(401).json({ message: 'Invalid email or password' });
   }
}
