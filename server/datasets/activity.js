var mongoose =require('mongoose');
var activity=new mongoose.Schema({
    initiator:{
      type:String
    },
    details:{
        type:String
    },
    link:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('activities', activity);