import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/auth/useAuth";
import { decodeToken } from "./utils/utils";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const auth = useAuth();
  const navigator = useNavigate();
  const decoded = useMemo(() => decodeToken(auth.token), [auth]);

  const [anchor, setAnchor] = useState(null);

  const handleLogout = () => {
    auth.logout();
    navigator("/");
    window.location.reload(false);
  };

  const handleOpenMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  return !window.location.toString().includes("login") ? (
    <>
      <div
        className="navbar"
        id="nav-bar"
        style={{
          borderBottom: "1px solid black",
        }}
      >
        <div className="nav-container">
          <div className="nav-content">
            <Link to={"/"} style={{ marginLeft: "20px" }}>
              <div id="logo-circle">
                <div
                  id="logo"
                  style={{
                    backgroundPosition: "center",
                    backgroundImage: `url(${process.env.PUBLIC_URL + "/logo/logo-icon.png"})`,
                  }}
                />
              </div>
            </Link>

            <IconButton
              aria-controls={Boolean(anchor) ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchor) ? "true" : undefined}
              onClick={handleOpenMenu}
              sx={{
                marginLeft: "auto",
                marginRight: "25px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              onClose={handleCloseMenu}
              anchorEl={anchor}
              open={Boolean(anchor)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                }}
              >
                User Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
