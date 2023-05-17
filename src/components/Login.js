import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'



const LoginIG =  () => {

    // EN PRODUCCION SERIA: const redirectUri = encodeURIComponent('https://quedeporte.com.ar/auth/token');
    // const redirectUri = encodeURIComponent('https://localhost:443/api/auth/token');
    const redirectUri = encodeURIComponent('https://localhost:443/api/1.0/apigraph/token');
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=180895391557997&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;

    // const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=180895391557997&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    // const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=180895391557997&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`

    // FUNCION PARA PEDIR DATOS DE USUARIO FUNCIONANDO, (CON EL ACCESS TOKEN DE LA INTERFACE API GRAPH CON ACCESO DE USUARIO)
    const getDatos = async () => {
        const response = await axios.get('https://graph.facebook.com/v16.0/me', {
            params: {
                'fields': 'name',
                'access_token': 'EAADSzpbdiTABAOKVjserx9wG6LryY9Vj6IHkF2AJaLTKH1sU3ZAGgRKG5EPJZB9ZC4SPjqmPS5OPl5wgVzUYikLQLRVmPmrHgk2wSM9JxHDeV6x3bJZAwqH50DPU7V9KC9HBkDjcP1uvCkDusUDUoZCVjXEktZBI4Ka0U717cC0fZCYaqNofj8j0mKdn7qZCfpCq7kfVjp3bNAZDZD'
            }
            });
            console.log(response.data)
    }

    const getDatosApi = async () => {
        const response = await axios.get('')
        console.log(response.data)
    }

    // const getDatos = async () => {
    //     const response = await axios.get('https://graph.facebook.com/v16.0/me', {
    //         params: {
    //             'fields': 'name,birthday,email',
    //             'access_token': 'EAADSzpbdiTABAEthkhN9N3yfZBUqZBY8gZADsLGwVZB9bY7ZCBCM0m9TvVZCiKkM6r8001O3prnxxlkUuDD8XY9ZCNvyBMQHjv9wQfVSZBLxOB5slMNCNRA13yrrdFM3Dd7Jr3EOgqzOsnENaSL3qh8qGeT8z8RHEmU8Jw5CzMosJjuL7uoCSlZCxgiHV0RmatyGPTptpbFe4DS3RVXSrpOwdyWgBmNILvVM1bibRUed6N9XwVNeOBZAla'
    //         }
    //         });
    //         console.log(response.data)
    // }

    const getAccessToken = async () => {
        
        const response = await axios.post(
          'https://localhost:443/api/1.0/apigraph/token')
        console.log(response.data)

        }

    return (
    <>

        <div className="container my-2">
            <button><Link to="https://localhost:443/api/1.0/blog/listado/web"> Probar apiquedeporte localmente</Link> </button>
        </div>


        <div className="container my-2">
            <button><Link to={instagramAuthUrl}> VENTANA DE AUTORIZACION INSTAGRAM</Link> </button>
        </div>


        <div className="container my-2">
            <button onClick={getAccessToken}> GENERAR ACCESS TOKEN CON EL CODIGO QUE NOS AUTORIZO INSTAGRAM</button>
        </div>

        <div className="container my-2">
            <button onClick={getDatos} >PEDIR DATOS EN CONSOLA CON ACCESS TOKEN DE LA API GRAPH </button>
        </div>


    </>
    )
}

// "https://api.instagram.com/oauth/authorize?client_id=231784736196912&redirect_uri=http://localhost:8080/auth/instagram&scope=user_profile,user_media&response_type=code"


export default LoginIG