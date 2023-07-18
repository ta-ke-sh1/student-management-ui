import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <div className="navbar">
                <div className="nav-container">
                    <div className="nav-content">
                        <Link to={"/"} style={{ marginLeft: "10px" }}>
                            <div
                                id="logo"
                                style={{
                                    backgroundImage: `url(${
                                        process.env.PUBLIC_URL +
                                        "/logo/logo-icon.png"
                                    })`,
                                }}
                            />
                        </Link>
                        <Button
                            variant="outlined"
                            disableElevation={true}
                            style={{
                                marginLeft: "auto",
                                marginRight: "15px",
                            }}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
