import React, { useEffect, useState } from "react";
import {
    decodeToken,
} from "../../utils/utils";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function ValidToken({ children }) {
    let auth = useAuth();
    const navigate = useNavigate();

    const [isExpired, setExpired] = useState(false);

    useEffect(() => {
        if (auth.token) {
            var decoded = decodeToken(auth.token);
            setInterval(() => {
                var duration = decoded.exp - Date.now() / 1000;
                if (duration < 0) {
                    setExpired(true);
                }
            }, 1000);
        }
    }, [auth.token]);

    if (!auth.token) {
        return <>{children}</>;
    }

    if (isExpired) {
        localStorage.setItem("access_token", "");
        auth.logout();
        navigate("/");
        return;
    }

    return (
        <>
            {children}
        </>
    );
}
