// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
// import other pages as needed

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/*Route path="/" element={<HomePage />} /> */}
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* other routes */}
            </Routes>
        </Router>
    );
}

export default App;
