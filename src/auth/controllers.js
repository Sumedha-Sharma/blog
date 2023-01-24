const {User}= require("./models");
const jwt= require("jsonwebtoken");
const register= async(req,res)=>{
    const {username,password}=req.body;
    const isExist= await User.findOne({username:username});
    if(isExist){
        return res.json({status:"Username Already Exists"}); 
    }
    
    if(password.length<6){
        return res.json({status:"Password should contain atleast 6 characters"});
    }
    let _user= new User(req.body);
    _user= await _user.save();
    _user.ency_password=undefined;
    _user.salt=undefined;


    
    return res.json({status: 'User created succesfully',_user});
};
const commonLogin= async(req,res,next)=>{
    const { username, password } = req.body;
    const isUser = await User.findOne({username : username});
    if(!isUser){
        return res.json({status : "User not found"});
    }
    if(!isUser.authenticate(password)){
        return res.json({status : "Passwords do not match"});
    }
  let token=  jwt.sign({_id: isUser._id},isUser.salt)
  req.body.token=token;
  req.body.isUser=isUser;
  next();
}
const login = async(req,res) => {
    return res.json({status : "login successful",data:req.body});
}
const reset= async(req,res)=>{
    let user=  await User.findOne({username:req.body.username});
    user.password=req.body.newPassword;
   user= await user.save();
   

    return res.json({status: 'Password Reset'})
};
module.exports={register,commonLogin,login,reset}