// src/components/LoginWithGoogle.js

import React from "react";

const BACKEND_LOGIN_URL = "http://localhost:8000/auth/login";

function LoginWithGoogle() {
    const handleLogin = () => {
        window.location.href = BACKEND_LOGIN_URL;
    };

    return (
        <button onClick={handleLogin}>
            Login with Google
        </button>
    );
}

export default LoginWithGoogle;
