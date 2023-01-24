// require mongoose
const mongoose= require("mongoose");
// require uuid
const uuid=require("uuid");
const cryptoJS=require("crypto-js");
const userSchema= new mongoose.Schema({
username:{
    type:String,
    unique:true,
    trim:true,//trim whitespace
},
name:String,
ency_password:String,
salt:String,//key
email:String,

},
{
    timestamps:true
}
)
//method to create secure password

userSchema.methods={
    securePassword: function(plainPassword){
        return cryptoJS.SHA256(plainPassword,this.salt).toString();
    },
    authenticate : function(password){
        return this.ency_password === this.securePassword(password);}
};

userSchema.virtual("password").set(function(plainPassword){
    this.salt=uuid.v4();
    this.ency_password= this.securePassword(plainPassword);
});
const User= mongoose.model("User",userSchema);
module.exports={ User };