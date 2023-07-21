import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <div className="navbar">
                <div className="nav-container">
                    <div className="nav-content">
                        <Link to={"/"} style={{ marginLeft: "10px" }}>
                            <div id="logo-circle">
                                <div
                                    id="logo"
                                    style={{
                                        backgroundImage: `url(${
                                            process.env.PUBLIC_URL +
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
