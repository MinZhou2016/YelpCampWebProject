var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    passport   = require("passport"),
    LocalStrategey = require("passport-local"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB      = require("./seeds");
    
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/auth");

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://campproject1:zhouming20pp@ds133290.mlab.com:33290/yelpcampdb");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport configulation
app.use(require("express-session")({
    secret: "This is the YelpCamp",
    resave:false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategey(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(commentRoutes);

// seedDB();


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Your Yelp Camp is serving Now!");
})