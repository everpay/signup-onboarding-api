var User = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Do user creation
 */
exports.createUser = (req, res, next) => {
  const { UserInfo } = req.body;
  if (UserInfo && UserInfo.email && UserInfo.password) {
    User.find({ "UserInfo.username": UserInfo.email }, function (err, user) {
      if (err) {
        console.log('err------', err)
        return res.status(500).send("Server failed to process the data");
      }

      if (user.length == 0) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(UserInfo.password, salt, function (err, hash) {
            UserInfo.password = hash;
            UserInfo.username = UserInfo.email;
            req.body.UserInfo = UserInfo;
            User.create(req.body,
              function (err, user) {
                if (err) {
                  console.log('--------errerr-r-------', err)
                  return res.status(500).send("Server failed to process the data");
                }
                res.status(200).send({ error: false, user });
              });
          });
        });
      } else {
        return res.send({ error: true, message: "User already exixts" });
      }
    });
  } else {
    console.log('--------err-r-------')
    return res.status(500).send("Server failed to process the data");
  }
}

/**
 * Do user login
 */
exports.doLogin = (req, res, next) => {
  if (req.body && req.body.email && req.body.password) {
    User.find({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.status(500).send("Server failed to process the data");
      }
      if (user.length == 0)
        return res.status(404).send("No user found.");
      res.status(200).send("Logged In Successfully");
    });
  } else {
    return res.status(404).send("No user found.");
  }
}