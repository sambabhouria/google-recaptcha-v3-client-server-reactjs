// const jwt = require("jsonwebtoken");
// const dataAccessLayer = require("../../data-access-layer");
// var bcrypt = require("bcryptjs");
// const jwtKey = "my_secret_key";
// const jwtExpirySeconds = 300;

// const test = (req, res) => {
//   res.status(200).json({ message: "====> test worked" });
// };

// const signUp = (req, res) => {
//   const { username, password } = req.body;
//   console.log("User signUp: ", username, password);
//   const saltRounds = 10;
//   bcrypt.hash(password, saltRounds, function(err, hash) {
//     const userId = dataAccessLayer.users.create({
//       username: username,
//       password: hash
//     });

//     if (err) {
//       return res.status(401).send({
//         success: false,
//         message: "user in not created"
//       });
//     } else {
//       return res.status(200).send({
//         success: true,
//         UserId: `User with Id ${userId} is created`
//       });
//     }
//   });
// };

// const LogIn = (req, res) => {
//   const { username, password } = req.body;
//   //check  if user is in database
//   const user = dataAccessLayer.users
//     .list()
//     .find(user => user.username === username);

//   if (user === null) {
//     return res.status(401).send({
//       success: false,
//       token: null,
//       err: "User don't exist"
//     });
//   }
//   bcrypt.compare(password, user.password, function(err, result) {
//     if (result === true) {
//       // Create a new token with the username in the payload
//       // and which expires 300 seconds after issue
//       const token = jwt.sign({ username }, jwtKey, {
//         algorithm: "HS256",
//         expiresIn: jwtExpirySeconds
//       });
//       // set the cookie as the token string, with a similar max age as the token
//       // here, the max age is in milliseconds, so we multiply by 1000
//       res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
//       return res.status(200).send({
//         success: true,
//         err: null,
//         token
//       });
//     } else {
//       console.log("le mode de passe n'est bon ");
//       res.status(401).json({
//         success: false,
//         token: null,
//         err: "Entered Password and Hash do not match!"
//       });
//     }
//   });
// };

// function getUsers() {
//   console.log("getUsers");
// }

// function deleteUser() {
//   console.log("deleteUsers");
// }

// const welcome = (req, res) => {
//   // We can obtain the session token from the requests cookies, which come with every request
//   const token = req.cookies.token;

//   // if the cookie is not set, return an unauthorized error
//   if (!token) {
//     return res.status(401).end();
//   }

//   var payload;
//   try {
//     // Parse the JWT string and store the result in `payload`.
//     // Note that we are passing the key in this method as well. This method will throw an error
//     // if the token is invalid (if it has expired according to the expiry time we set on sign in),
//     // or if the signature does not match
//     payload = jwt.verify(token, jwtKey);
//   } catch (e) {
//     if (e instanceof jwt.JsonWebTokenError) {
//       // if the error thrown is because the JWT is unauthorized, return a 401 error
//       return res.status(401).end();
//     }
//     // otherwise, return a bad request error
//     return res.status(400).end();
//   }

//   // Finally, return the welcome message to the user, along with their
//   // username given in the token
//   res.send(`Welcome ${payload.username}!`);
// };

// const refresh = (req, res) => {
//   // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).end();
//   }

//   var payload;
//   try {
//     payload = jwt.verify(token, jwtKey);
//   } catch (e) {
//     if (e instanceof jwt.JsonWebTokenError) {
//       return res.status(401).end();
//     }
//     return res.status(400).end();
//   }
//   // (END) The code uptil this point is the same as the first part of the `welcome` route

//   // We ensure that a new token is not issued until enough time has elapsed
//   // In this case, a new token will only be issued if the old token is within
//   // 30 seconds of expiry. Otherwise, return a bad request status
//   const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
//   if (payload.exp - nowUnixSeconds > 30) {
//     return res.status(400).end();
//   }

//   // Now, create a new token for the current user, with a renewed expiration time
//   const newToken = jwt.sign({ username: payload.username }, jwtKey, {
//     algorithm: "HS256",
//     expiresIn: jwtExpirySeconds
//   });

//   // Set the new token as the users `token` cookie
//   res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 });
//   res.end();
// };

// module.exports = {
//   signUp,
//   LogIn,
//   welcome,
//   refresh,
//   test,
//   getUsers,
//   deleteUser
// };
