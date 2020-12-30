import {useLocation } from 'react-router-dom';


const  GetUrlPath = () => {
    const location = useLocation();
    return location.pathname;
  }


module.exports = {
    GetUrlPath
};
