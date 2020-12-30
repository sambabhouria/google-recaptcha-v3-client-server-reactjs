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
    console.log('donner envoyer a google======> ',req.body )
    const standToGoogle = {
        name: 'smba',
        email: 'sambabhouria@gmail.com',
        'g-recaptcha-response': '03AGdBq26QD5Ihkot9ouVVydEMe6kjmGQ_NHWeispLMv2BIco651aeTBagUD5ohqDVjVACsyzumOObg1TJejLh7UAZuih5pXD8DX75gsuMrtOrGk_7G7XdDjAQGko_Nz_zF2BNioMV_hMVqB27XR2-Elmkjxi7DrCCDt4BYpz91OL9QLLNuBq7PUT7knnCW4BlRqa1i7W0vLow7hoNEY05i183BEOYn2l4tk46UuFFA85Zh2jJfqbjrQ83j3eqlcNDBUuD8DyVODpBlfxTzedY3H9JBI3zpwuktKnwarHxBjgA0tzkYc2MgpUYkSSJlplGxhaFw---zXNEpcJ0-KJcLOmcuIg99CSd-3DTVrzXoPnR6Ux4T0bnj8i8F5JSX0hUlt-IfRYnTcz4vpm2YCntnA9ZCkvLLCXotK6-fGxE1x3iZJCFYZBBDnDYZY5DZ7tsg2KIUVvoRImeP0-59AM7WpDMgQI8Lu0no97ovr4Q2ySneM-UweOhkLI'
      }
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
   console.log('body request', req.body)
//    console.log('token envoyer a google', token)
     const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`
    // var VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${req.body['g-recaptcha-response']}`;
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
