import React from "react";
import { useAuth } from "../hooks/userAuth";
import LoginWithGoogle from "../components/LoginWithGoogle";
import Home from "./Home";

function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) return <LoginWithGoogle />;

    return <div><Home/></div>;
}

export default Dashboard;
