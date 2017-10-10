/**
 * Created by Alvin on 3/12/2017.
 */

var User=require('../datasets/users.js');
var Buzz=require('../datasets/buzz.js');
var Activity=require('../datasets/activity.js');
var response;
module.exports.create=function(req,res){
    Buzz.find({handle:req.body.handle},function(err,result){
        if(result.length){
            response={
                error:true,
                message:'handle exists'
            };
            res.json(response);
        }
        else{
            User.find({'email':req.session.email},function(err,userdata){

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
            buzz.email=req.session.email;
            buzz.save();
            var activitydet={
                initiator:req.session.email,
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
module.exports.checkhandle=function(req,res){
    Buzz.find({handle:req.body.handle},function(err,result) {
        if (result.length) {
            response = {
                error: true,
                message: 'handle exists'
            };
            res.json(response);
        }
        else {
           response={
                error:false,
                message:'Handle in unique'
           };
           res.json(response);
        }
        }
    )
};
module.exports.getdetails=function (req,res) {

    Buzz.find({handle:req.body.handle},function(err,results){
        if(results.length){
            Buzz.find({'comments.stand':true,handle:req.body.handle},function(err,res1) {
                stand = res1.length;
            })
            Buzz.find({'comments.stand':false,handle:req.body.handle},function(err,res1) {
                against = res1.length;
            })
            var response={
                title:results[0].title,
                description:results[0].description,
                fors:results[0].for,
                against:results[0].against,
                comments:results[0].comments
            }
            res.json(response);

        }
    });

};
module.exports.comment=function (req,res) {
     Buzz.find({handle:req.body.handle},function(err,results){

        if(results.length){

            var length=results[0].comments.length;
            var setter={
                username:req.body.username,
                comment:req.body.comment,
                stand:req.body.stand
            };
            results[0].comments[length]=setter;
            if(req.body.stand === 'true'){
                results[0].for=results[0].for+1;
            }
            else{
                results[0].against=results[0].against+1;
            }
            results[0].save();
            var response={
                flag:true
            };
            console.log('updated');
        }
    });
}