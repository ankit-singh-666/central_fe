import React from "react";
import styles from "./LoginWithGoogle.module.css";

const BACKEND_LOGIN_URL = "http://localhost:8000/auth/login";

function LoginWithGoogle() {
    const handleLogin = () => {
        window.location.href = BACKEND_LOGIN_URL;
    };

    return (
        <button
            className={styles.loginButton}
            onClick={handleLogin}
            aria-label="Login with Google"
            type="button"
        >
            Login with Google
        </button>
    );
}

export default LoginWithGoogle;
