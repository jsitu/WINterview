var User = require('mongoose').model('User'),
    passport = require('passport');

exports.getAll = function(req, res) {
  // TODO: Database call
  // var allusers = data;
  // res.json(allusers);
};

exports.getOne = function(req, res) {
  var id = req.params.id;
  // TODO: Database call
  // var user = data[0];
  // res.json(user);
};

exports.create = function(req, res) {
  var newuser = req.body;
  // TODO: Database call
  // data.push(newuser);
  // res.json(newuser);
};

exports.update = function(req, res) {
  var obj = req.body;
  var id = req.params.id;
  
  User.findByIdAndUpdate(id, { $set: obj }, function (err, user) {
    if (err) {
      res.send(err);
    }
    
    if (user) {
      res.send(user);
    }
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  // TODO: Database call
  // data.splice(id, 1);
  // res.json(true);
};

exports.signin = function(req, res, next) {
  var user = new User(req.body);

  console.log(user);

  
  User.findOne({email:user.email}, function(err, matchUser) {
    if (err) {
      res.send(err);
    }

    if (!matchUser) {
      res.send({
        "error": "User with this email does not exist."
      })
    } else {
      if (!matchUser.authenticate(matchUser.hashPassword(user.password))) {
        res.send({
          'error': "There was an error with your email/password combination."
        });
      }
      else {
        res.send({
          'error': "",
          'userId': matchUser._id
        });
      }
    }
  })
};

exports.signup = function(req, res, next) {
  if (!req.user) {
    var user = new User(req.body);
    
    User.findOne({email:user.email}, function(err, matchUser) {
      if (err) {
        res.send(err);
      }

      if (!matchUser) {
        user.save(function(err) {
          if (err) {
            console.log(err);
          }

          req.login(user, function(err) {
            if (err) return next(err);
            res.send({
              'error': "",
              'userId': user._id
            });
          });
        });
      } else {
        // User already existed
        res.send({
          'error': "User with this email already existed."
        });
      }
    })
  } else {
    // return res.redirect('/');
  }
};

exports.signout = function(req, res) {
  req.logout();
  // TODO: Redirect to the sign in screen
};