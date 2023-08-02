import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {

    const navigator = useNavigate();

    return (
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
                        </Button>

                    </div>
                </div>
            </div>
        </>
    );
}
