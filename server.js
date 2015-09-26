//BASE SET UP
//  ============================================
var express    = require('express');//Bring in Node framework
var app        = express(); //Create app with express
var mongoose   = require('mongoose'); //Mogoose for mongodb
var morgan     = require('morgan'); //log requests through the console
var bodyParser = require('body-parser'); //Pull information through HTML POST
var config     = require('./config');
var path       = require('path');


//CONNTECT TO DATABASE
// ==============================
mongoose.connect(config.database);
//Test Database connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not establish database connection'));
db.once('open', function(data){
  console.log("Succesfull database connection");
});


//CONFIGURATION
//  ============================================
//Use body-parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Config CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//Log all requests to the console
app.use(morgan('dev'));

//Set static file locations used for requests that FrontEnd makes
app.use(express.static(__dirname + '/public'));


//ROUTES (API)
//  ============================================

var apiRoutes = require('./routes/api')(app,express);
app.use('/api', apiRoutes); //Prefix /api to our api Routes

//Catchall Route --------------------
//Send Users to FrontEnd ------------
//Must be registerd after API Routes
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})


//START THE SERVER
//  ============================================
app.listen(config.port);
console.log('Listening on Port: ', config.port);
