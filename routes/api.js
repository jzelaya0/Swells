//api.js
var bodyParser = require('body-parser');
var User       = require('../models/user');
var Surf       = require('../models/surf');
var jwt        = require('jsonwebtoken');
var config     = require('../config');

//superSecret secret for creating tokens
var superSecret = config.secret;

//Pass in app and express to use express object for express.Router()
module.exports = function(app, express){
  // Instance of express Router
  var apiRouter = express.Router();


  //API AUTHENTICATE ROUTE
  // ====================================================================================
  //Route for authenticating user at /api/authenticate
  apiRouter.post('/authenticate', function(req, res){
    //find the user and select username and password explicitly
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user){
      if(err) throw err;

      // no user with that username was found
      if(!user){
        res.json({success: false, message: 'Authentication failed. User not found'});
      }else if (user) {
        //check if password is a match
        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword) {
          res.json({success: false, message: 'Authentication failed. Wrong password'});
        }else {
          //if user is found and password matches
          var token = jwt.sign({
            name: user.name,
            username: user.username
          }, superSecret, {
            expiresInMinutes: 1440 //Expires in 24 hours
          });

          //return the information including token as json
          res.json({
            success: true,
            message: 'Here is your token',
            token: token
          });//End response json
        }
      }
    });
  });//End Post authenticate



  //API USERS ROUTE  (Create User)
  // ====================================================================================
  //routes that end with /users --------------------
  //create a user before the token Middleware so that a new user could be created

  //CREATE a user on /api/users
  apiRouter.post('/users', function(req, res){
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
  });//End User Post





  //TOKEN MIDDLEWARE
  // ====================================
  //Middleware to use before for all requests(Token varification)
  apiRouter.use(function(req,res,next){
    //logging
    console.log('A visitor has arrived');

    //Check Header OR Url parameters OR POST parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //Decode the token
    if(token){
      //Verifies secret and checks expiration
      jwt.verify(token, superSecret, function(err, decoded){
        if(err){
          return res.json({success: false, message: 'Failed token authentication'});
        }else {
          //If token checks out, save the request to be used in other routes
          req.decoded = decoded;
          // GET USER HERE
          User.findOne({username: decoded.username}, function(err, user){
             req.user = user;
             next();
          });

        }
      });

    }else {
      //if there is no token return 403(access forbidden) and an error message
      return res.status(403).send({success: false, message: 'No token Provided'});
    }

  });//End Middleware




  //TEST ROUTE
  // ====================================
  //Test Route
  apiRouter.get('/', function(req,res){
    res.json({message: "Welcome to the API"});
  });




  //API ROUTES USERS
  // ====================================================================================
  //routes that end with /users --------------------
  apiRouter.route('/users')

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

    //UPDATE the user with this id at /users/:user_id
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
          res.json({message: 'User has been updated!'});
        });//End save

      });//End find by id
    })//End Post

    //DELETE a user with this id at /users/:user_id
    .delete(function(req,res){
      User.remove({
        _id: req.params.user_id
      }, function(err, user){
        if(err) res. send(err);

        res.json({message: 'Succesfully deleted user'});
      });
    });

    //api endpoint to get user information
    apiRouter.get('/me', function(req, res){
      res.send(req.decoded);
    });

    //API ROUTES SURF
    // ====================================================================================
    //routes that end with /surf --------------------

    apiRouter.route('/surf')

      //CREATE a surf on /api/surf
      .post(function(req, res){
        //create a new instance of the surf model
        var surf = new Surf();

        //set the surf information that comes from requests
        surf.title = req.body.title;
        surf.longitude = req.body.longitude;
        surf.latitude = req.body.latitude;
        surf.comment = req.body.comment;
        surf.user_id = req.user._id;

        //save user and check for errors
        surf.save(function(err){
          if(err)
              res.send(err);

          res.json({message: 'Surf Session Created!'});
        });//End save

      })//End Post

      //GET surf sessions at api/surf from a specifit user
      .get(function(req, res){
        Surf.find({user_id: req.user._id},function(err, surfSesh){
          if(err) res.send(err);
          res.json(surfSesh);
        });

      });//End Get

    //routes that end with /surf/:surf_id --------------------
    apiRouter.route('/surf/:surf_id')
      .get(function(req, res){
        Surf.find({user_id: req.user._id, _id:req.params.surf_id}, function(err,surf){
          if(err) res.send(err);

          res.json(surf);
        });//end find

      })//Eng Get





    return apiRouter;

};
