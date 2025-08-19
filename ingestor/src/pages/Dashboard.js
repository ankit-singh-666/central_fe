import React from "react";
import { useAuth } from "../hooks/userAuth";
import LoginWithGoogle from "../components/LoginWithGoogle";

function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) return <LoginWithGoogle />;

    return <div>Logged in! Token: {user.token}</div>;
}

export default Dashboard;
