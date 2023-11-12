import { Button, Grid } from "@mui/material";
import axios from "axios";

export default function AssignmentGradingModal(props) {

    function submitGrade() {
        try {
            axios.post(process.env.REACT_APP_HOST_URL + "/").then((res) => {
                if (res.data.status) {

                } else {
                    props.sendToast("error", res.data.data);
                }
            })
        } catch (e) {
            props.sendToast("error", e.toString());
        }

    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={6} xs={6}>
                    <Button fullWidth variant="outlined" onClick={submitGrade}>
                        Submit
                    </Button>
                </Grid>
                <Grid item sm={6} xs={6}>
                    <Button fullWidth variant="outlined" onClick={props.closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}