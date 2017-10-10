/**
 * Created by Alvin on 3/7/2017.
 */
var mongoose =require('mongoose');
var buzzschema=new mongoose.Schema({
    handle:{
        type:String
    },
    email:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    comments:[{
        username:String,
        comment:String,
        stand:Boolean
    }],
    for:{
        type:Number,
        default:0},
    against:{
        type:Number,
        default:0}
});
module.exports=mongoose.model('buzz', buzzschema);