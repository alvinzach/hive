var mongoose =require('mongoose');
var crypto=require('crypto');
var jwt=require('jsonwebtoken');
var userschema=new mongoose.Schema({

    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true

    },
    img:{
        type:String,
        default:"uploads/default.gif"
    },

    followers:[{
        id:String
    }],
    following:[{
        id:String
    }],
    campaigns:[{
        id:String
    }],
    hash:String,
    salt:String
});

userschema.methods.setpassword=function (password) {
    this.salt=crypto.randomBytes(16).toString('hex');
    this.hash=crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha1').toString('hex');

};
userschema.methods.validatepassword=function(password){
    var hash=crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};
userschema.methods.generatejwt=function(){
    var expiry=new Date();
    expiry.setDate(expiry.getDate()+7);
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name,
        exp: parseInt(expiry.getTime()/1000),
        },"credentials");
};
module.exports=mongoose.model('users', userschema);