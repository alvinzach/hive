/**
 * Created by Alvin on 3/4/2017.
 */
var User=require('../datasets/users.js');
module.exports.userdetails=function (req,res) {
    var id=req.body.id;
    User.find({email:id},function (err,result) {
        if(result.length){
            res.json(result[0]);
        }
    });
};
module.exports.logout=function (req,res) {
    req.session.id=undefined;
    req.session.loggedin=false;
    res.send("logged out");
}
