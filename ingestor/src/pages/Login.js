// src/pages/Login.js

import React from "react";
import LoginWithGoogle from "../components/LoginWithGoogle";

function Login() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login</h2>
            <LoginWithGoogle />
        </div>
    );
}

export default Login;
