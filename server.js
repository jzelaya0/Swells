//BASE SET UP
//  ============================================
var express    = require('express');//Bring in Node framework
var app        = express(); //Create app with express
var mongoose   = require('mongoose'); //Mogoose for mongodb
var morgan     = require('morgan'); //log requests through the console
var bodyParser = require('body-parser'); //Pull information through HTML POST
var port       = process.env.PORT || 3000;//Set the port for app
