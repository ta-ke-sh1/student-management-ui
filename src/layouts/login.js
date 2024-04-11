import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Divider, Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decodeToken, randomIntWithinRange } from "../utils/utils";
import { useAuth } from "../hooks/auth/useAuth";

export default function LoginScreen() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [curr, setCurr] = useState(randomIntWithinRange(2, 5));
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkExistingToken();
  });

  const checkExistingToken = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoggedIn(true);
      return;
    }
    const decodedToken = decodeToken(token);
    if (decodedToken.exp < Date.now()) {
      handleNavigate(decodedToken);
    } else {
      setLoggedIn(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(process.env.REACT_APP_HOST_URL + "/auth/oauth", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === false) {
          setError(response.data.error);
        } else {
          let t = response.data.data.accessToken;
          localStorage.setItem("access_token", t);
          if (t) {
            auth.token = t;
            const token = decodeToken(t);
            auth.clearance = token.role;
            handleNavigate(token);
            window.location.reload();
          } else {
            setError("Failed to retrieve a valid token!");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to login!");
        // setError(error)
      });
  };

  const handleNavigate = (token) => {
    console.log(token);
    if (token.role === 1) {
      navigate("/home");
    }

    if (token.role === 2) {
      navigate("/home");
    }

    if (token.role === 3) {
      navigate("/admin");
    }

    return;
  };

  return (
    <div className="login-container">
      <Grid container>
        <Grid item sm={12} md={6} className="grid-item">
          <div className="login-component">
            <img
              width={300}
              src={`${process.env.PUBLIC_URL}/logo/logo-full.png`}
              alt="logo"
              style={{
                margin: "0 auto",
                marginBottom: "25px",
              }}
            />
            <Divider sx={{ width: "50%", margin: "0 auto" }} />
            <br />
            <h1>Sign In</h1>
            <p>Login using your username and password to access University of Greenwich Vietnam' student services.</p>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="username-form"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password-form"
                autoComplete="current-password"
                sx={{
                  mb: 3,
                }}
              />
              <Divider />
              {error && error !== "" ? (
                <Alert severity="error">
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              ) : (
                <></>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, padding: "10px 0px" }}>
                Sign In
              </Button>
              <br />
            </form>
          </div>
        </Grid>
        <Grid item sm={0} md={6} className="grid-item">
          <div
            className="login-banner"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/banner/image` + curr + ".jpg)",
              borderRadius: "10px",
              backgroundSize: "cover",
            }}
          ></div>
        </Grid>
      </Grid>
    </div>
  );
}
