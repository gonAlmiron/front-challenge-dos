import React from 'react';
import { Link } from "react-router-dom";


const LoginIG =  () => {

    return (
        <>
        <div className="container my-2">
            <Link to="http://localhost:8080/auth/instagram"> Logear con Instagram </Link>
        </div>
        </>
    )
}

export default LoginIG