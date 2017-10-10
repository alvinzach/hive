/**
 * Created by Alvin on 4/4/2017.
 */
var User=require('../datasets/users.js');
var Buzz=require('../datasets/buzz.js');
var Activity=require('../datasets/activity.js');
module.exports.fetch=function(req,res){
        console.log(req.body.handle);
        Buzz.find({handle:req.body.handle},function (err,response) {
            console.log(response[0].comments);
            res.send(response[0].comments);
        })
};

