import React from "react";
import LoginWithGoogle from "../components/LoginWithGoogle";
import styles from "./Login.module.css";

function Login() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2 className={styles.loginTitle}>Sign in to Your Account</h2>
                <LoginWithGoogle />
            </div>
        </div>
    );
}

export default Login;
