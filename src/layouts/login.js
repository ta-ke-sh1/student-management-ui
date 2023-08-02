import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Divider, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { randomIntWithinRange } from '../utils/utils';


export default function LoginScreen() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [curr, setCurr] = useState(randomIntWithinRange(2, 5))

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
            <Grid container>
                <Grid item sm={12} md={6} className='grid-item'>
                    <div className='login-component'>
                        <img width={300} src={`${process.env.PUBLIC_URL}/logo/logo-full.png`} alt='logo' style={{
                            margin: '0 auto',
                            marginBottom: '25px'
                        }} />
                        <Divider sx={{ width: '50%', margin: '0 auto' }} />
                        <br />
                        <h1>Sign In</h1>
                        <p>Login using your username and password to access University of Greenwich Vietnam' student services.</p>
                        <form onSubmit={handleSubmit} >
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
                            <br />
                        </form>
                    </div>
                </Grid>
                <Grid item sm={0} md={6} className='grid-item'>
                    <div className='login-banner' style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/banner/image` + curr + ".jpg)",
                        borderRadius: '10px',
                        backgroundSize: 'cover',
                    }}>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}