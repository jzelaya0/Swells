//BASE SET UP
//  ============================================
var express    = require('express');//Bring in Node framework
var app        = express(); //Create app with express
var mongoose   = require('mongoose'); //Mogoose for mongodb
var morgan     = require('morgan'); //log requests through the console
var bodyParser = require('body-parser'); //Pull information through HTML POST
var port       = process.env.PORT || 3000;//Set the port for app
var User       = require('./models/user');


//CONNTECT TO DATABASE
// ==============================
mongoose.connect('mongodb://jesse:iration@ds035653.mongolab.com:35653/swellsdb');
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

//Middleware to use before for all requests
apiRouter.use(function(req,res,next){
  //logging
  console.log('A visitor has arrived');
  next();//Go to the next Route
});


//Test Route
apiRouter.get('/', function(req,res){
  res.json({message: "Welcome to the API"});
});

//routes that end with /users --------------------
apiRouter.route('/users')

  //CREATE a user on /api/users
  .post(function(req, res){
    //creat a new user instance from User model
    var user = new User();

    //set the users information that comes from requests
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    //save user and check for errors
    user.save(function(err){
      if(err){
        //A duplicate was entered
        if(err.code == 11000){
          return res.json({success: false, message: 'A user with that username exists'});
        }else {
          return res.send(err);
        }
      }
      res.json({message: 'User created!'});
    });//End save
  })//End Post

  //GET all users at /api/users
  .get(function(req, res){
    User.find(function(err,users){
      if(err){
        res.send(err);
      }
      //Return all users
      res.json(users);
    });
  });//End Get

//routes that end with /users:user_id --------------------
apiRouter.route('/users/:user_id')
  //GET a single user at /users/:user_id
  .get(function(req,res){
    User.findById(req.params.user_id, function(err,user){
      if(err) res.send(err);

      // return the user
      res.json(user);
    });
  })//End Get

  //UPDATE the user with this id at /user/:user_id
  .put(function(req,res){
    //use user model to find the user we want
    User.findById(req.params.user_id, function(err,user){
      if(err) res.send(err);

      //update the users info only if it is new(no blanks)
      if(req.body.name) user.name = req.body.name;
      if(req.body.username) user.username = req.body.username;
      if(req.body.password) user.password = req.body.password;

      //save user
      user.save(function(err){
        if(err) res.send(err);

        // return message
        res.json({message: 'User has been updated!'})
      })//End save

    });//End find by id
  });//End Post


//Register Routes --------------------
app.use('/api', apiRouter);//Prefix /api to our api Routes



//START THE SERVER
//  ============================================
app.listen(port);
console.log('Listening on Port: ', port);
