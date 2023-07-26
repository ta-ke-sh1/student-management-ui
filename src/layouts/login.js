import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function LoginScreen() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log({
            username: username,
            password: password
        })

        await axios.post(process.env.REACT_APP_HOST_URL + '/auth/login', {
            username: username,
            password: password
        }).then((response) => {
            console.log(response)
            if (response.data.error) {
                setError(response.data.error)
            } else {
                navigate("/")
            }
        }).catch((error) => {
            setError(error)
        })
    };

    return (
        <div className='login-container'>
            <div className='login-component'>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <h1>Sign In</h1>
                            <p>Login using your username and password to access FGW student services.</p>
                            <Box component="form" onSubmit={handleSubmit} >
                                <TextField
                                    onChange={(e) => setUsername(e.target.value)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username-form"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
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
                                        mb: 3
                                    }}
                                />
                                <Divider />
                                {error && error !== "" ? <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error}
                                </Alert> : <></>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, padding: '10px 0px' }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    )
}