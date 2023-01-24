const { model,Schema }= require("mongoose");
const { User } = require("../auth/models");
const { Blog } = require("../blog/models");

const commentSchema= new Schema({
    comment: String,
    
    user_id:{
        type:Schema.Types.ObjectId,
         ref:User    },
    blog_id:{
        type:Schema.Types.ObjectId,
         ref:  Blog  },

},{
    timestamps:true
}
)
const Comment= model("Comment",commentSchema);
module.exports={ Comment };