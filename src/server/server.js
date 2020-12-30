const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Bring in our dependencies
const routes = require("./routes");


const port = process.env.PORT || 4000;


const app = express();
/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

/*========= This is the typical node server setup so we can be able to parse the requests/responses coming in and out of the server ============*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// enable CORS using npm package
var cors = require('cors');

app.use(cors());
//  Connect all our routes to our application
app.use("/", routes);


// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Turn on that server!
app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "==> 🌎 📺 🙏 🚀 ⛵️ 💎 🛳  🦁 🍰 🏅✌️+❤️ Listening on port.",
      port
    );
  }
});
