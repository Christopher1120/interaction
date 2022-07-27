var express = require("express");
var path = require("path");
var flash = require("connect-flash");
var params = require("./params/params");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var fs = require("fs");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var moment = require("moment");

var app = express();


var setUpPassport = require("./setuppassport");

var port = app.set("port", process.env.PORT || 81);

mongoose.connect(params.DATABASECONNECTION, { useUnifiedTopology: true, useNewUrlParser: true });
setUpPassport();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "Welcome1120",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
})

app.use(passport.initialize());
app.use(passport.session());

app.use("/images", express.static(path.resolve(__dirname, "images")));
app.use("/", require("./routes/web"));


app.listen(app.get("port"), function (req, res) {
    console.log("Server has started at " + app.get("port"));
});


