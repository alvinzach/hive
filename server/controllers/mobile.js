var User=require('../datasets/users.js');
var Buzz=require('../datasets/buzz.js');
var Activity=require('../datasets/activity.js');
module.exports.createcampaign=function(req,res){
    Buzz.find({handle:req.body.handle},function(err,result){
        if(result.length){
            response={
                error:true,
                message:'handle exists'
            };
            res.json(response);
        }
        else{
            User.find({'email':req.body.email},function(err,userdata){

                var unid={
                    id:req.body.handle
                };
                var update=userdata[0];
                console.log(update.campaigns);
                var length=update.campaigns.length;
                console.log(length);
                update.campaigns[length]=unid;
                update.save();


            });
            var buzz=new Buzz(req.body);
            buzz.email=req.body.email;
            buzz.save();
            var activitydet={
                initiator:req.body.email,
                details:'created a new buzz',
                link:req.body.handle

            }
            var activity=new Activity(activitydet);
            activity.save();
            response={
                error:false,
                message:'buzz saved'
            };
            res.json(response);

        }
    });

};