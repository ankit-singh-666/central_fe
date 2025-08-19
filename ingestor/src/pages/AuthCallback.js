// src/pages/AuthCallback.js

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard"); // or any logged-in page
        } else {
            // Optional: handle error, show message
        }
    }, [location, navigate]);

    return <div>Processing login...</div>;
}

export default AuthCallback;
