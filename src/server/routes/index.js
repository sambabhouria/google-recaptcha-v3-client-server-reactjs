/**
 * ========> routes/index.js
 */
const routes = require("express").Router();
const request = require('request')
var fetch = require('node-fetch');
const {recaptchaSecretKey} = require("../../settings");

routes.get("/about", (req, res) => {
  res.status(200).json({ message: "about Page" });
});


// verify reCAPTCHA response
routes.post('/verify', (req, res) => {

    console.log('in the verify fonction ===>', req.body);
    var VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${req.body['g-recaptcha-response']}`;
    return fetch(VERIFY_URL, { method: 'POST' })
      .then(res => res.json())
      .then(json => res.send(json));
});

routes.post('/submit', (req, res) => {

    const {
        emailVal,
        messageVal,
        token
    } = req.body
    console.log('in the submit fonction ===>', req.body);
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`
    // var verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${req.body['g-recaptcha-response']}`;

    if (!token) {
        return res.json({
            "msg": 'There was a problem with your request. Please try again later.',
        })
    }

    request(verificationUrl, (err, response, body) => {
        // Stop process for any errors
        if (err) {
            return res.json({
                "msg": "Unable to process request."
            })
        }
        // Destructure body object
        // Check the reCAPTCHA v3 documentation for more information
        const {
            success,
            score
        } = JSON.parse(body)

        console.log('Recaptcha vaildation ===>', JSON.parse(body))
        // reCAPTCHA validation
        if (!success || score < 0.4) {

            return res.json({
                "msg": "Sending failed. Robots aren't allowed here.",
                "score": score
            })
        }

        // When no problems occur, "send" the form
        console.log('Congrats you sent the form:\n', emailVal, messageVal)

        // Return feedback to user with msg
        return res.json({
            "msg": "Your message was sent successfully!",
            "score": score
      })
  })
})

//localhost:4000/ - Displays "Index Page"
routes.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!!!!" });
});

module.exports = routes;
