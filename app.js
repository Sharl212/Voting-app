var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const { SchemaModel } = require("./public/javascripts/User_Schema");
const { Poll_Schema_Model } = require("./public/javascripts/Polls_Schema");
const { authenticate } = require("./public/javascripts/authenticate");

const mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// "mongodb://admin:budgetcalculator22@ds237669.mlab.com:37669/budgetcalculator"
mongoose.connect("mongodb://votingapp:123123@ds233500.mlab.com:33500/voting-app", (err, db) => {
  if (err) {
    return console.log(err);
  }

  console.log("Connected to MongoDB database on mLab servers..");
});

// view engine setup
app.set('views', path.join(__dirname, './client/build'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post("/register", (req, res) => { // register with username, password
  const newAccount = new SchemaModel({
    username: req.body.username,
    password: req.body.password
  });

  newAccount.save().then((data) => {
    return newAccount.generateAuthToken();
  }).then((token) => {
    res.cookie('authorizationToken', token).status(200).send();
  }).catch((err) => res.status(400).send(err));
});


app.post("/login", (req, res) => { // login , generate authentication token
  SchemaModel.findByCredentials(req.body.username, req.body.password).then(function (user) {
    return user.generateAuthToken().then(function (token) {
      res.cookie("authorizationToken", token).send(user);
    });
  }).catch((err) => {
    res.status(404).send();
  });
});

app.post("/polls", authenticate, (req, res) => { // create a new poll
  const newPoll = new Poll_Schema_Model({
    _creator: req.user._id,
    option1: req.body.option1,
    option2: req.body.option2
  });

  newPoll.save().then(() => {
    return newPoll.AddNewPoll(req.body.option1, req.body.option2);
  }).then(() => {
    res.status(200).send();
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get("/mypolls", (req, res) => { // fetch stored polls
  Poll_Schema_Model.find({}).then((polls) => {
    res.status(200).send(polls);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/voting/:id', (req, res) => {
  let id = req.params.id;
  const newVote = 1;
  let selectedOption = req.body.selectedOption;

  Poll_Schema_Model.findById(id).then((res) => { // get the old note votes
    let oldVoteOpt1 = res.poll[0].voteCounterOpt1;
    let oldVoteOpt2 = res.poll[0].voteCounterOpt2;
    let assignVote = increaseVotes(selectedOption, newVote, oldVoteOpt1, oldVoteOpt2); // addition both old and new votes;

    Update(assignVote, selectedOption);
    console.log('old vote counter', oldVoteOpt1, oldVoteOpt2);
    console.log(selectedOption);
    // console.log('NEW vote counter' , );
  }).catch((e) => res.status(400).send());

  function increaseVotes(selectedOption, newVote, oldVoteOpt1, oldVoteOpt2) {
    let addition;
    if (selectedOption === "option1") {
      return addition = oldVoteOpt1 + newVote;
    }
    else if(selectedOption === "option2"){
      return addition = oldVoteOpt2 + newVote;
    }
  }

  function Update(assignVote, selectedOption) {
    console.log(selectedOption);
    if (selectedOption === "option1") {
      Poll_Schema_Model.findByIdAndUpdate(id, { $set: { "poll.voteCounterOpt1": assignVote } }, { new: true }, (err, newPoll) => {
        res.status(200).send(newPoll);
      }).catch(() => {
        res.status(403).send();
      });
    } else if (selectedOption === "option2") {
      Poll_Schema_Model.findByIdAndUpdate(id, { $set: { "poll.voteCounterOpt2": assignVote } }, { new: true }, (err, newPoll) => {
        res.status(200).send(newPoll);
      }).catch(() => {
        res.status(403).send();
      });
    };
  };
});

app.listen(process.env.PORT || 3000, () => console.log('server is running on 3000..'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
