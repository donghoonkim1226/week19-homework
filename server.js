var express = require("express");
var bodyparser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var PORT = process.env.PORT || 7000;
var app = express();

app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

var db = "mongodb://localhost/psb-test";
mongoose.connect(db);
var User = require("./models/user.js");
// var Item = require("./models/item.js");
// var Review = require("./models/review.js");

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/registerUser", function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, newUser) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(newUser);
    }
  });
});

app.post("/login", function(req, res) {
  User.findOne({
    "username": req.body.username
  })
  .exec(function(err, user) {
    if (err) {
      console.log('error');
      res.send(err);
    }else{
      console.log(user);
      res.send(user);
    }
  })
});

app.post("/reloadBalance/:id", function(req, res){
  console.log(req.body)
  User.findOneAndUpdate({_id: req.params.id}, {balance: req.body.balance}, {new: true}, function(err, doc){
    if (err){
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});













app.listen(PORT, function() {
  console.log("LISTENING ON %s", PORT);
});