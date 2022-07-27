var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/account");

module.exports = function () {
    // turns a user object into an id
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    // turns the id into a user object
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use("login", new LocalStrategy({
        usernameField: 'username',
        passswordField: 'password'
    }, function (username, password, done) {
        User.findOne({ username: username}, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "Invalid Login Credentials" });
            }
            user.checkPassword(password, function (err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Invalid Login Credentials" });
                };
            });
        });
    }));


}


