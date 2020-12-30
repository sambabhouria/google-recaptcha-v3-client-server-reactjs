import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './client/routes';
import { ThemeProvider } from 'react-jss';
import Theme from './client/resources/theme';
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {recaptchaClientKey} from './settings'




ReactDOM.render(
  <ThemeProvider theme={Theme}>
    {/* THIS IS TO LOAD THE  GOOGLE REACAPTCHA PROVIDER FOR ALL THE APPS */}
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaClientKey}>
    <Router>
        <Routes />
     </Router>
     </GoogleReCaptchaProvider>
   </ThemeProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
