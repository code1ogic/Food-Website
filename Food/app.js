require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const stripe = require("stripe")("sk_test_51JiB7XSJjBncn0lk4MWAmVZhAjAOAg5M8sctRMUOowEWGQMC9vM6C9fDIvLKdMbof6gJeM0q3K79g1jLiW37NFvu00E2tlgPjZ");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "thisoursecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://dinesh:dinesh1997@cluster0.cuuqa.mongodb.net/foodUser",
  { useNewUrlParser: true }
);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("index", {key: "pk_test_51JiB7XSJjBncn0lk8wmSg4rJSBKKLk2FVidOk7gcKLN8Ysv1ioC7KTwklylcUWjMPmVpWOoV3zu8Sm89kIIGrxvx00GrVbESUd"});
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/:anyRoute", (req, res)=>{
  res.render("404");
})

app.get("/:any/:any", (req, res)=>{
  res.render("404");
})

app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (!err) {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/login");
        });
      } else {
        console.log(err);
        res.redirect("/register");
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (!err) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    } else {
      console.log(err);
    }
  });
});

app.post("/payment", (req, res)=> {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Books",
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "110092",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 700000, // Charing Rs 25
        description: "Books",
        currency: "INR",
        customer: customer.id,
      });
    })
    .then((charges) => {
        res.redirect("/"); // If no error occurs
    })
    .catch((err) => {
      res.redirect("/"); // If some error occurs
    });
}); 

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});
