const express = require("express");
const app = express();
const PORT = 3500;
const amqp = require("amqplib/callback_api");
const path = require("path");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var session = require("express-session");

// require("jsdom-global")();

var interval = 0;
var secTimes = 0;

app.get("/", function (req, res) {
  console.log("hit route get");
});
app.post("/", function (req, res) {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = "logs";
      var msg = process.argv.slice(2).join(" ") || "User trying crossing";

      channel.assertExchange(exchange, "fanout", {
        durable: false,
      });
      channel.publish(exchange, "", Buffer.from(msg));
      res.send("Message sent sucessfully to traffic light");
    });

    setTimeout(function () {
      connection.close();
    }, 500);
  });
  console.log("Hitted");
});

//--------
app.get("/iotApp", function (req, res) {
  res.sendFile(path.join(__dirname + "/iotApp.html"));
});

app.get("/table", function (req, res) {
  res.sendFile(path.join(__dirname + "/table.html"));
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodelogin",
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/login", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/iotApp");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.listen(PORT, function () {
  console.log("Server is running on http://localhost/:" + PORT);
});
