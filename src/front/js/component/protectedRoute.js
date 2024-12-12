import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRoute = ({ children }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.user) {
            actions.fetchUserData();
        }
    }, [store.user, actions]);

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

