import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {

    useEffect(() => {
        if (window.location.href.startsWith("http://localhost:3000/test")) {
            document.getElementById('nav-bar').style.width = '95%'
        } else {
            document.getElementById('nav-bar').style.width = '65%'
        }

        window.addEventListener('resize', () => {
            if (window.location.href.startsWith("http://localhost:3000/test")) {
                document.getElementById('nav-bar').style.width = '95%'
            } else {
                document.getElementById('nav-bar').style.width = '65%'
            }
        })

    }, [])

    return (
        <>
            <div className="navbar" id="nav-bar">
                <div className="nav-container">
                    <div className="nav-content">
                        <Link to={"/"} style={{ marginLeft: "10px" }}>
                            <div id="logo-circle">
                                <div
                                    id="logo"
                                    style={{
                                        backgroundImage: `url(${process.env.PUBLIC_URL +
                                            "/logo/logo-icon.png"
                                            })`,
                                    }}
                                />
                            </div>
                        </Link>
                        <Button
                            variant="contained"
                            disableElevation={true}
                            style={{
                                marginLeft: "auto",
                                marginRight: "25px",
                            }}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
