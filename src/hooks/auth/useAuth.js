import { useContext, createContext } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import React, { useState, useMemo } from "react";
import ValidToken from "./validToken";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [clearance, setClearance] = useState(
        localStorage.getItem("clearance")
    );

    const login = async (data) => {
        console.log("Auth provider login!");
        setToken(data.token);
        setClearance(data.clearance);
    };

    const logout = () => {
        setToken(null);
        setClearance(0);
        localStorage.removeItem("access_token")
    };

    let value = useMemo(() => ({ token, clearance, login, logout }), [token]);

    return (
        <AuthContext.Provider value={value}>
            <ValidToken>{children}</ValidToken>
        </AuthContext.Provider>
    );
}

export function RequireAuth({ props }) {
    let auth = useAuth();

    console.log(auth)

    if (!auth.token) {
        return <Navigate to="/" />;
    }

    if (props) {
        var clearance = auth.clearance;
        if (clearance < props.clearance) {
            console.log(
                "Your level of authority is too low! Level: " + props.clearance
            );
        }
    } else {
        console.log("Null props");
    }

    return <Outlet />;
}
