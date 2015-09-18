// surf.js
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//SURF SCHEMA
//  ============================================
var SurfSchema = new Schema({
  title: String,
  longitude: Number,
  latitude: Number,
  comment: String,
  created: { type: Date, default: Date.now },
  user_id: {type: Schema.ObjectId, ref: 'User'}
});

var Surf = mongoose.model('Surf', SurfSchema);

module.exports = Surf;
