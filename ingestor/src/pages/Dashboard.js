import React from "react";
import { useAuth } from "../hooks/userAuth";
import LoginWithGoogle from "../components/LoginWithGoogle";
import Home from "./Home";
import Login from "./Login";
import DriveFileSelector from "./platform/DriveFileSelector";

function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) return <Login />;

    return <div><DriveFileSelector/></div>;
}

export default Dashboard;
