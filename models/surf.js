// surf.js
var mongoose = require('mongoose');
var Schmea   = mongoose.Schema;

//SURF SCHEMA
//  ============================================
var SurfSchema = new Schema({
  title: String,
  longitude: Number,
  latitude: Number,
  comment: String,
  created: { type: Date, default: Date.now },
  userId: String
});

var Surf = mongoose.model('Surf', SurfSchema);

module.exports = Surf;
