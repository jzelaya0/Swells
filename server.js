//BASE SET UP
//  ============================================
var express    = require('express');//Bring in Node framework
var app        = express(); //Create app with express
var mongoose   = require('mongoose'); //Mogoose for mongodb
var morgan     = require('morgan'); //log requests through the console
var bodyParser = require('body-parser'); //Pull information through HTML POST
var port       = process.env.PORT || 3000;//Set the port for app

//CONFIGURATION
//  ============================================
//Use body-parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Config CORS requests
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested, content-type, \ Authorization');
  next();
});

//Log all requests to the console
app.use(morgan('dev'));


//ROUTES (API)
//  ============================================

//Basic HomePage Route (Temporary)
app.get('/', function(req,res){
  res.send('Welcome to the home page!');
});

//Instance of express router
var apiRouter = express.Router();


//Test Route
apiRouter.get('/', function(req,res){
  res.json({message: "Welcome to the API"});
});

//Register Routes --------------------
app.use('/api', apiRouter);//Prefix /api to our api Routes



//START THE SERVER
//  ============================================
app.listen(port);
console.log('Listening on Port: ', port);
