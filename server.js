var path=require('path');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var express=require('express');
var expressvalidator=require('express-validator');
var expresssession=require('express-session');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
mongoose.connect('mongodb://localhost:27017/hive');

var authorisation=require('./server/controllers/authorisation');
var dashboard=require('./server/controllers/dashboardcontroller');
var buzz=require('./server/controllers/buzz');
var mobile=require('./server/controllers/mobile');
var sentiments=require('./server/controllers/sentiment');

app.use(bodyparser.json());
app.use(expressvalidator());
app.use(express.static(__dirname+'/public'));
app.use(expresssession({secret:'azach',saveUninitialized:false,resave:false}));
/*app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/home.html'));
});*/
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if(!req.session.loggedin)
         res.render('index');
    else
        res.render('dashboard',{id:req.session.email,req:req});
});
app.get('/buzz',function (req,res) {
    res.render('index');
});
app.get('/buzz/:buzz_id',function(req,res){
    if(!req.session.loggedin)
        res.render('buzz',{id:'stranger',base:req.baseUrl,req:req});
    else
        res.render('buzz',{id:req.session.email,req:req});

});

io.on('connection', function(socket){
    socket.on('new buzz', function(msg){
        console.log(msg);
        io.emit('new buzz', msg);
    });
});

app.post('/api/user/register',authorisation.register);
app.post('/api/user/login',authorisation.login);
app.post('/api/dashboard/userdetails',dashboard.userdetails);
app.post('/api/dashboard/logout',dashboard.logout);
app.post('/api/buzz/createbuzz',buzz.create);
app.post('/api/buzz/checkhandle',buzz.checkhandle);
app.post('/api/buzz/getdetails',buzz.getdetails);
app.post('/api/buzz/comment',buzz.comment);
//apis for app
app.post('/api/app/createcampaign',mobile.createcampaign);
//api for python
app.post('/api/python/sentiments',sentiments.fetch);

app.use('/angular',express.static(__dirname+'/node_modules/angular'));
app.use('/route',express.static(__dirname+'/node_modules/angular-ui-router'));
app.use('/socket',express.static(__dirname+'/node_modules/socket.io-client/dist'));

http.listen(3000,function(req,res){
    console.log("connected");
});
