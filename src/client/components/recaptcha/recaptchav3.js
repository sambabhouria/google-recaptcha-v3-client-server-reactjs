import React, { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"


const Recaptchav3 = () => {
    const [token, setToken] =  useState("");
    const { executeRecaptcha } = useGoogleReCaptcha();
    const clickHandler = async () => {
        if (!executeRecaptcha) {
            return;
        }

        const result = await executeRecaptcha("homepage");

        setToken(result);
        console.log(token)
    };
    return (
       <>
         Token: {token} <br/><br/>
        <button type='submit' color='blue' onClick={clickHandler}>Test google recaptcha</button>
       </>
    )
}

export default  Recaptchav3;
