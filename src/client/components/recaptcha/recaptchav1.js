import { useState,useEffect } from 'react';
import './recaptcha.css';

const SITE_KEY = "";

function RecaptchaV1() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleOnClick = e => {
    e.preventDefault();
    setLoading(true);
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
        console.log('valeur du  token envoyer au server......', token)
        submitData(token);
      });
    });
  }

  const submitData = token => {
    // call a backend API to verify reCAPTCHA response
    fetch('http://localhost:4000/verify', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "g-recaptcha-response": token
      })
    }).then(res => res.json()).then(res => {
      setLoading(false);
      setResponse(res);
    });
  }

  // THIS useEffect is LOAD ONCE FOR LOAD THE GOOGLE RECAPTCHA PROVIDER IF YOU WRAPP YOUR APPS WITH THE
  /**
   * <GoogleReCaptchaProvider
        reCaptchaKey="[Your recaptcha key]"
      >
        <YourApp />
      </GoogleReCaptchaProvider>
   **/
  // YOU DO NOT NEED TO  LOAD THIS SCRIP THEN REMVE IT
  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    }

    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
      console.log("Script loaded!");
    });
  }, []);

  return (
    <div className="app">
      <h3 style={{color: 'red', marginBottom: '10px'}}>Google recaptcha v3 in React </h3>
      <span style={{marginBottom: '10px'}}>In this part i will show how to to implement reCAPTCHA v3 in React. There are many libraries that are available to
          add Google reCAPTCHA to the React application, but if possible the functionality should be implemented without external packages.
      </span>
      <div style={{ textAlign: 'left',}}>
      <h3>Steps to implement Recaptcha v3 in React</h3>
      <ul>
        <li>Generate google reCAPTCHA v3 keys using this link -<a href="https://www.google.com/recaptcha/admin/create" target="_blank" rel="noopener noreferrer">Recaptcha -Admin-Create</a></li>
        <li>Create a react application using the command npx create-react-app my-react-app-recaptcha-v3</li>
        <li> Add google reCAPTCHA  component</li>
        <li> Call a backend API to verify reCAPTCHA response</li>
        <li>  Output the response</li>
      </ul>
      </div>
      <div className="div-form">
        <label>Name: </label>
        <input type="text" onChange={e => setName(e.target.value)} value={name} />
      </div>
      <div className="div-form">
        <label>Email: </label>
        <input type="text" onChange={e => setEmail(e.target.value)} value={email} />
      </div>
      <button onClick={handleOnClick} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      <br /><br />
      {response && <label>Output:<br /><pre>{JSON.stringify(response, undefined, 2)}</pre></label>}
    </div>
  );
}


export default RecaptchaV1;
