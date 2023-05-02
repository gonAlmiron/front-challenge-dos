import React from 'react';
import { Link } from "react-router-dom";


const LoginIG =  () => {

  window.fbAsyncInit = function() {
    FB.init({
        appId      : '231784736196912',
        cookie     : true,
        xfbml      : true,
        version    : '16.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


   const redirectUri = encodeURIComponent('https://quedeporte.com.ar/auth/');
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=180895391557997&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;





    return (
    <>
    <div className="container mx-2">
        <div className="container my-2">
            <Link to="https://localhost:443/auth/facebook"> <h1>Logear con Instagram </h1> </Link>
        </div>
        <hr/>
        <div className="container my-2">
            <Link to="https://localhost:443/auth/facebook"> <h1> Logear con Facebook </h1> </Link>
        </div>
        <div className="fb-login-button" scope="public_profile" data-width="" data-size="" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="false"></div>
        </div>

        <div className="container my-2">
            <a href={instagramAuthUrl}> VENTANA DE AUTORIZACION INSTAGRAM</a>
        </div>

    </>
    )
}

// "https://api.instagram.com/oauth/authorize?client_id=231784736196912&redirect_uri=http://localhost:8080/auth/instagram&scope=user_profile,user_media&response_type=code"


export default LoginIG