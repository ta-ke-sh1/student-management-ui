import { Button, Grid } from "@mui/material";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useRef, useState } from "react";


export default function AvatarForm(props) {

    const frame = useRef(null)

    const [file, setFile] = useState(null)

    useEffect(() => {
        console.log(props.user)
    }, [])

    const handleConfirm = () => {
        if (!file) {
            props.sendToast("error", "Please select an image!")
            return
        }

        const formData = new FormData()
        formData.append("id", props.user.id)
        formData.append("role", props.user.role)
        formData.append("name", file.name)
        formData.append("path", "/avatar/" + props.user.id + "/avatar.jpg")
        formData.append("avatar", file)

        axios.put(process.env.REACT_APP_HOST_URL + "/user/avatar?username=" + props.user.id, formData, {
            'Content-Type': 'multipart/form-data'
        }).then((res) => {
            if (res.data.status) {
                props.sendToast("success", "Updated avatar!")
                props.handleClose();
                props.refresh()
            } else {
                props.sendToast("error", res.data.data)
            }
        })
    }

    return (
        <>
            <div style={{
                padding: '0px'
            }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sx={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        textAlign: 'center'
                    }}>
                        <h2 style={{

                        }}>You can update your avatar here</h2>
                        <img style={{
                            objectFit: 'cover',
                            margin: '0 auto',
                            borderRadius: '80px',
                            border: '0.5px solid rgba(0.0,0, 0.2)'
                        }} height={file !== null ? 160 : 0} width={file !== null ? 160 : 0} ref={frame} />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiFileInput
                            name="avatar"
                            fullWidth
                            value={file}
                            multiple={false}
                            onChange={(newValue) => {
                                console.log(newValue);
                                setFile(newValue);
                                if (newValue) {
                                    frame.current.src = URL.createObjectURL(newValue)
                                }

                            }} />
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
            </div>

        </>
    )
}