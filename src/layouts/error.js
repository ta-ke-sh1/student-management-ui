import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate();

    return (
        <>
            <div style={{
                position: "relative",
                width: "100vw",
                height: "100vh"
            }}>
                <div style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Box display="flex"
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center" minHeight="100vh">
                        <img src={process.env.PUBLIC_URL + "/404.jpg"} alt="404.jpg" height={300} style={{
                            marginBottom: '40px'
                        }} />
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h3" mb={1}>
                            Page not found!
                        </Typography>
                        <Typography mb={2}>
                            We could not found the page you were looking for.
                        </Typography>
                        <Button variant="outlined" onClick={() => {
                            navigate("/login")
                        }}>
                            Return
                        </Button>
                    </Box>
                </div>
            </div>
        </>
    );
}
