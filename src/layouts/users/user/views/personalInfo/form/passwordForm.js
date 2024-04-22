import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { getCache, items } from "../../../../../../utils/dataOptimizer";

export default function PasswordForm(props) {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [hideOld, setHideOld] = useState(true)
    const [hideNew, setHideNew] = useState(true)
    const [hideConfirm, setHideConfirm] = useState(true)

    useEffect(() => {
        console.log(props)
    }, [])

    const handleConfirm = () => {
        if (hideNew !== hideConfirm) {
            props.sendToast("error", "New password does not match with confirmation!")
            return
        }

        let user = getCache(items.UserDetails)
        if (user.password !== oldPassword) {
            props.sendToast("error", "Password does not match!")
            return
        }

        axios.put(process.env.REACT_APP_HOST_URL + "/user/password", {
            id: user.username,
            role: user.role,
            password: newPassword
        }).then((res) => {
            if (res.data.status) {
                props.sendToast("success", "Updated password!")
                props.handleClose();
                props.refresh()
            } else {
                props.sendToast("error", res.data.data)
            }
        })

    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Change your password</h2>
                    <p>First enter your old password, <br /> then enter the new password and confirm to update password</p>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Enter your old password</InputLabel>
                        <OutlinedInput endAdornment={
                            <InputAdornment>
                                <IconButton onClick={() => {
                                    setHideOld(!hideOld)
                                }}>
                                    {hideOld ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        } type={hideOld ? "password" : "text"} fullWidth onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} label="Enter your old password" />
                    </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Enter your new password</InputLabel>
                        <OutlinedInput endAdornment={
                            <InputAdornment>
                                <IconButton onClick={() => {
                                    setHideNew(!hideNew)
                                }}>
                                    {hideNew ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        } type={hideNew ? "password" : "text"} fullWidth onChange={(e) => setNewPassword(e.target.value)} value={newPassword} label="Enter your new password" />
                    </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Please confirm your new password</InputLabel>
                        <OutlinedInput endAdornment={
                            <InputAdornment>
                                <IconButton onClick={() => {
                                    setHideConfirm(!hideConfirm)
                                }}>
                                    {hideConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        } type={hideConfirm ? "password" : "text"} fullWidth onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} label="Please confirm your new password" />

                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{
                        height: '50px'
                    }} variant="contained" fullWidth onClick={handleConfirm}>Save</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{
                        height: '50px'
                    }} variant="outlined" fullWidth color="error" onClick={props.handleClose}>Cancel</Button>
                </Grid>
            </Grid>
        </>
    )
}