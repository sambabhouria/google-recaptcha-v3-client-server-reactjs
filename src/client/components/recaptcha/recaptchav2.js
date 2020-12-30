import React, { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue)

  const handleChange = e => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange,
  }
}

function Recaptchav2() {
    const [loading, setLoading] = useState(false);
    const email = useFormInput("")
    const message = useFormInput("")

    const { executeRecaptcha } = useGoogleReCaptcha()
    // const [token, setToken] = useState("")
    const [notification, setNotification] = useState("")

    // Value for body-parser
    const emailVal = email.value
    const messageVal = message.value

    const handleSubmit = async (e) => {
      e.preventDefault()

      setLoading(true);

      // Check if the captcha was skipped or not
      if (!executeRecaptcha) {
        return
      }

      // handle empty fields just in case
      if (!email.value) {
        setNotification(`Please don't leave any of the fields empty.`)
      } else if (!message.value) {
        setNotification(`Please don't leave any of the fields empty.`)
      }

      // This is the same as grecaptcha.execute on traditional html script tags
      const token = await executeRecaptcha("recaptchav1Page")
      console.log("resultat du token reoutourner par google", token);
      // await setToken(result) //--> grab the generated token by the reCAPTCHA

      // Prepare the data for the server, specifically body-parser
      const data = JSON.stringify({ emailVal, messageVal, token })

      // POST request to your server
      // ${process.env.REACT_APP_SECRET_NAME}`
      fetch("http://localhost:4000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // headers: {
        //   Accept: "application/json, text/plain, */*",
        //   "Content-type": "application/json",
        // },
        body: JSON.stringify({
          "name": messageVal,
          "email": emailVal,
          token
        })
        // body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log("data", data);
          setLoading(false);
          setNotification(data.msg)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="app">
          <div className="div-form">
            <label>Email: </label>
            <input type="text" name="email" id="email" {...email} required />
          </div>
          <div className="div-form">

            <label>Message: </label>
            <textarea
                name="message"
                id="message"
                rows="4"
                {...message}
                required
            ></textarea>
           </div>
            <input type="submit" value={loading ? 'Sending...' : 'Send'}  disabled={loading} />
            <br />
            {notification && <span>{notification}</span>}
        </form>
    )
}

export default  Recaptchav2;
