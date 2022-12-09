const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log("test user object");

//opret Schema:
// {timestamps: true} er optional...
const userSchema = new Schema({
  username: {
  type: String,
  required: true
 },
  points: {
  type: Number,
  required: true
 },
  opponent1: {
  type: String,
  required: true
 },
  opponent2: {
  type: String,
  required: true
 },
  opponent3: {
  type: String,
  required: true
 }
},
 {timestamps: true});

// Opret model: brug User for at bruge Users i db!
const User = mongoose.model('User', userSchema);
module.exports = User;

