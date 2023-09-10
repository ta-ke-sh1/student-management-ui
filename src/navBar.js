import { Button } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/auth/useAuth";
import { decodeToken } from "./utils/utils";

export default function NavBar() {
    const auth = useAuth()
    const navigator = useNavigate();
    const decoded = useMemo(() => decodeToken(auth.token), [auth])
    const [isLoggedIn, setLoggedIn] = useState(true)

    useEffect(() => {
        setLoggedIn(decoded === "-1")
    })

    const handleLogout = () => {
        auth.logout();
        setLoggedIn(true)
        navigator("/");
        window.location.reload(false);
    }

    return !window.location.toString().includes("login") ? (
        <>
            <div className="navbar" id="nav-bar">
                <div className="nav-container">
                    <div className="nav-content">
                        <Link to={"/"} style={{ marginLeft: "20px" }}>
                            <div id="logo-circle">
                                <div
                                    id="logo"
                                    style={{
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${process.env.PUBLIC_URL +
                                            "/logo/logo-icon.png"
                                            })`,
                                    }}
                                />
                            </div>
                        </Link>
                        {
                            isLoggedIn ?
                                <Button
                                    onClick={() => {
                                        navigator("/login")
                                    }}
                                    variant="contained"
                                    disableElevation={true}
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "45px",
                                    }}>
                                    Login
                                </Button> :
                                <Button
                                    onClick={() => {
                                        handleLogout()
                                    }}
                                    variant="contained"
                                    disableElevation={true}
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "45px",
                                    }}>
                                    Logout
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    ) : <></>;
}
