//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const fullName = req.body.fName;

  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fullName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/4f69a6a68c";

  const options = {
    method: "POST",
    auth: "tomsky:d8658119e3e724d081c157045c16d703-us7",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

// app.post("/success", function (req, res) {
//   res.redirect("/index.html");
// });

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started");
});
// ---------------------------------------------------------------

// process.env.PORT
